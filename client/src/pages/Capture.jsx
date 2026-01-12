import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import cameraBtn from '../assets/camera-button.png'; 

export default function Capture() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get layout config from previous page (default to single if direct access)
  const selectedLayoutId = location.state?.layout || 'single';

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  // State
  const [stream, setStream] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [filter, setFilter] = useState('none'); 
  const [countdown, setCountdown] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [flash, setFlash] = useState(false);

  // Determine target number of photos based on layout
  const getTargetCount = () => {
    switch(selectedLayoutId) {
      case 'strip-3': return 3;
      case 'strip-4': return 4;
      case 'grid-2x2': return 4;
      case 'grid-2x3': return 6;
      default: return 1;
    }
  };
  const targetCount = getTargetCount();
  const isComplete = photos.length === targetCount;

  // Determine CSS Grid columns for the PREVIEW area
  const getPreviewLayoutClass = () => {
    switch(selectedLayoutId) {
      case 'grid-2x2': return 'grid-cols-2';
      case 'grid-2x3': return 'grid-cols-2'; 
      default: return 'grid-cols-1'; 
    }
  };

  // Initialize Camera on Mount
  useEffect(() => {
    async function setupCamera() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user", width: 1280, height: 720 } 
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Please allow camera access to use the photobooth.");
      }
    }
    setupCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Filter Styles Helper
  const getFilterStyle = () => {
    switch (filter) {
      case 'low-quality': return 'contrast-125 brightness-110 saturate-150 blur-[0.5px] sepia-[0.2]';
      case 'bw': return 'grayscale';
      default: return '';
    }
  };

  // Capture Logic
  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Apply filters for saved image
      if (filter === 'bw') context.filter = 'grayscale(100%)';
      if (filter === 'low-quality') context.filter = 'contrast(125%) brightness(110%) saturate(150%) blur(0.5px) sepia(20%)';
      
      context.translate(canvas.width, 0);
      context.scale(-1, 1); 
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      const imageUrl = canvas.toDataURL('image/png');
      
      setFlash(true);
      setTimeout(() => setFlash(false), 100);

      return imageUrl;
    }
    return null;
  };

  // Automated Sequence
  const startCaptureSequence = async () => {
    if (isCapturing || isComplete) return; // Prevent start if already full
    setIsCapturing(true);
    
    // Calculate how many photos left to take
    const photosNeeded = targetCount - photos.length;
    
    
    let currentPhotos = photos.length === targetCount ? [] : [...photos];
    if (photos.length === targetCount) setPhotos([]);

    const loopCount = photos.length === targetCount ? targetCount : photosNeeded;

    for (let i = 0; i < loopCount; i++) {
      // Countdown
      for (let count = 3; count > 0; count--) {
        setCountdown(count);
        await new Promise(r => setTimeout(r, 1000));
      }
      setCountdown(''); // clear number for snap
      
      const newPhoto = takePhoto();
      if (newPhoto) {
        setPhotos(prev => {
          const updated = [...prev, newPhoto];
          currentPhotos = updated;
          return updated;
        });
      }
      
      await new Promise(r => setTimeout(r, 500)); 
      setCountdown(null);
    }

    setIsCapturing(false);
  };

  const handleFinish = () => {
    navigate('/preview', { state: { photos, layout: selectedLayoutId } });
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-20 pb-10 overflow-hidden">
      <Navbar />

      <canvas ref={canvasRef} className="hidden" />

      {/* Main Content Area */}
      <div className="flex flex-col md:flex-row gap-6 items-start justify-center w-[95%] max-w-7xl z-10">
        
        {/* LEFT SIDE: Camera Feed & Controls */}
        <div className="flex flex-col items-center gap-6 w-full md:w-3/4">
          
          {/* Viewfinder Frame */}
          <div className="relative w-full aspect-video bg-black rounded-xl border-3 border-black overflow-hidden shadow-2xl">
            <video 
              ref={videoRef}
              autoPlay 
              playsInline
              muted
              className={`w-full h-full object-cover transform -scale-x-100 ${getFilterStyle()}`}
            />

            {flash && <div className="absolute inset-0 bg-white opacity-80 z-50"></div>}
            {countdown && (
              <div className="absolute inset-0 flex items-center justify-center z-40">
                <span className="text-9xl font-bold text-white drop-shadow-lg animate-pulse">
                  {countdown}
                </span>
              </div>
            )}
            
            {!stream && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500">
                <p>Waiting for camera permission...</p>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between w-full px-4 gap-10">
            <div className="flex gap-4">
              {['Default', 'Low Quality', 'Black and White'].map((opt) => {
                 const val = opt === 'Default' ? 'none' : opt === 'Low Quality' ? 'low-quality' : 'bw';
                 return (
                   <button
                    key={opt}
                    onClick={() => setFilter(val)}
                    disabled={isCapturing}
                    className={`px-3 py-1.5 rounded-full border-2 font-button font-semibold transition-all
                      ${filter === val ? 'bg-black text-white border-black' : 'bg-white text-black border-black hover:bg-gray-100'}
                    `}
                   >
                     {opt}
                   </button>
                 );
              })}
            </div>

            <button 
              onClick={startCaptureSequence}
              disabled={isCapturing || !stream || isComplete}
              className={`relative group transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed
                ${isComplete ? 'opacity-50' : ''}
              `}
            >
               <img src={cameraBtn} alt="Snap" className="w-16 h-16" />
            </button>
          </div>
        </div>

        {/* RIGHT SIDE: Preview Area */}
        <div className="w-full md:w-1/4 flex flex-col gap-4 h-auto max-h-[80vh]">

          <div className={`grid gap-2 w-full overflow-y-auto p-1 ${getPreviewLayoutClass()}`}>
             {[...Array(targetCount)].map((_, i) => (
                <div 
                  key={i} 
                  className="aspect-video w-full bg-[#f0f0f0] rounded-lg border-2 border-black overflow-hidden flex items-center justify-center shadow-sm"
                >
                  {photos[i] ? (
                    <img src={photos[i]} alt={`Shot ${i+1}`} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-300 font-bold text-xl">
                      {i + 1}
                    </span>
                  )}
                </div>
             ))}
          </div>

          {/* Submit / Finish Button */}
          {isComplete && (
            <button
              onClick={handleFinish}
              className="w-full mt-2 py-3 bg-white text-black border-2 font-bold rounded-lg shadow-lg hover:bg-black hover:text-white transition-all animate-bounce-short"
            >
              Finish →
            </button>
          )}

        </div>

      </div>
    </div>
  );
}