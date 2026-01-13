import { useRef, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import Navbar from '../components/Navbar'; 
import outputTitle from '../assets/output.png'; 
import cartBg from '../assets/cart.png';
import logoDark from '../assets/logo.png'; 
import logoLight from '../assets/logo-white.png';
import spotifyCodeBlack from '../assets/spotify-code-black.png'; 
import spotifyCodeWhite from '../assets/spotify-code-white.png'; 

export default function Output() {
  const navigate = useNavigate();
  const location = useLocation();
  const printRef = useRef(null);
  
  // Retrieve state passed from Preview.jsx
  const { photos, layout, frameColor, selectedSong } = location.state || { 
    photos: [], 
    layout: 'single', 
    frameColor: 'white', 
    selectedSong: null 
  };

  const [isDownloading, setIsDownloading] = useState(false);

  // Helper to determine grid class for the PHOTO CONTAINER based on layout
  const getLayoutClass = () => {
    switch (layout) {
      case 'single': return 'grid-cols-1';
      case 'strip-3': return 'grid-cols-1 gap-4';
      case 'strip-4': return 'grid-cols-1 gap-4';
      case 'grid-2x2': return 'grid-cols-2 gap-2';
      case 'grid-2x3': return 'grid-cols-2 gap-2';
      default: return 'grid-cols-1';
    }
  };

  // Helper for Frame Dimensions based on layout
  const getFrameStyle = () => {
    if (layout.includes('strip')) {
      return { width: '300px', minHeight: '400px' };
    }
    return { width: '400px', minHeight: '500px' };
  };

  // 1. Handle Download Logic
  const handleSave = async () => {
    if (printRef.current) {
      setIsDownloading(true);
      try {
        // Wait a moment for images to be fully ready if needed
        const canvas = await html2canvas(printRef.current, {
          scale: 2, // Higher scale for better resolution
          useCORS: true,
          backgroundColor: null, // Transparent background if possible
        });
        
        const link = document.createElement('a');
        link.download = `snaptify-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error("Download failed:", error);
        alert("Failed to save image. Please try again.");
      }
      setIsDownloading(false);
    }
  };

  // 2. Handle Try Again (Navigation)
  const handleTryAgain = () => {
    // Navigate back to layout selection to start over
    navigate('/layout');
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-20 pb-10 overflow-hidden">
      <Navbar />

      <div className="w-full flex items-center justify-center mb-4 animate-fade-in-down">
        <img 
          src={outputTitle} 
          alt="Your Snaptify is Ready" 
          className="h-10 md:h-16 object-contain" 
        />
      </div>

      {/* 2. Main Display Area (Cart + Output) */}
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center mb-5">
        
        {/* The Cart Background */}
        <div className="relative z-0 flex items-center justify-center">
            <img 
              src={cartBg} 
              alt="Cart" 
              className="w-75 md:w-100 object-contain opacity-90"
            />
        </div>

        {/* The Final Output Frame */}
        <div className="absolute top-90 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pt-10">
            
            <div 
              ref={printRef}
              className={`relative p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-fade-in
                ${frameColor === 'white' ? 'bg-white' : 'bg-black'}
              `}
              style={{ 
                ...getFrameStyle(),
                transform: 'scale(0.65)', 
                transformOrigin: 'top center'
              }}
            >
                {/* Logo */}
                <div className="flex justify-center mb-4">
                  <img 
                    src={frameColor === 'white' ? logoDark : logoLight} 
                    alt="Brand Logo" 
                    className="w-30 object-contain opacity-90"
                  />
                </div>

                {/* Photos */}
                <div className={`grid w-full h-auto ${getLayoutClass()}`}>
                  {photos.map((photo, index) => (
                    <div key={index} className="aspect-video w-full overflow-hidden bg-gray-200">
                      <img src={photo} alt={`Snap ${index}`} className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>

                {/* Spotify Code & Song Info */}
                <div className="mt-4 flex flex-col items-center gap-2">
                  <img 
                    src={frameColor === 'white' ? spotifyCodeBlack : spotifyCodeWhite} 
                    alt="Spotify Code" 
                    className="w-32 md:w-40 opacity-80"
                  />
                  {selectedSong && (
                    <p className={`text-[9px] font-semibold uppercase tracking-widest text-center font-button ${frameColor === 'white' ? 'text-black' : 'text-white'}`}>
                      {selectedSong.title} - {selectedSong.artist}
                    </p>
                  )}
                </div>
            </div>

        </div>
      </div>

      {/* 3. Action Buttons */}
      <div className="flex gap-6 mt-10 md:mt-2 z-20">
        
        <button 
          onClick={handleTryAgain}
          className="px-8 py-2 rounded-full border-2 border-black bg-white text-black font-button font-semibold hover:bg-gray-100 transition-all transform hover:scale-105"
        >
          Snap Again
        </button>

        <button 
          onClick={handleSave}
          disabled={isDownloading}
          className="px-8 py-3 rounded-full bg-black text-white font-button font-semibold shadow-xl hover:bg-gray-900 transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-wait"
        >
          {isDownloading ? 'Saving...' : 'Save'}
        </button>

      </div>

    </div>
  );
}