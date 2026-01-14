import { useRef, useState } from 'react';
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
  
  const { photos, layout, frameColor, selectedSong } = location.state || { 
    photos: [], layout: 'single', frameColor: 'white', selectedSong: null 
  };

  const [isDownloading, setIsDownloading] = useState(false);

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

  const getFrameStyle = () => {
    if (layout.includes('strip')) {
      return { width: '300px', minHeight: '600px' };
    }
    return { width: '400px', minHeight: '300px' };
  };

  // Handle Download Logic (Full Size, Hidden Render)
  const handleSave = async () => {
    if (printRef.current) {
      setIsDownloading(true);
      try {
        const canvas = await html2canvas(printRef.current, {
          scale: 3, 
          useCORS: true,
          backgroundColor: null, 
        });
        const link = document.createElement('a');
        link.download = `snaptify-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      } catch (error) {
        console.error("Download failed:", error);
        alert("Failed to save image.");
      }
      setIsDownloading(false);
    }
  };

  const handleTryAgain = () => {
    navigate('/layout');
  };

  // Reusable Frame Content
  const FrameContent = () => (
    <>
      <div className="flex justify-center mb-4">
        <img 
          src={frameColor === 'white' ? logoDark : logoLight} 
          alt="Brand Logo" 
          className="w-30 object-contain"
        />
      </div>
      <div className={`grid w-full h-auto ${getLayoutClass()}`}>
        {photos.map((photo, index) => (
          <div key={index} className="aspect-video w-full overflow-hidden" style={{ backgroundColor: '#e5e7eb' }}>
            <img src={photo} alt={`Snap ${index}`} className="w-full h-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-4 flex flex-col items-center gap-2">
        <img 
          src={frameColor === 'white' ? spotifyCodeBlack : spotifyCodeWhite} 
          alt="Spotify Code" 
          className="w-32 md:w-40"
        />
      </div>
    </>
  );

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-20 pb-10 overflow-hidden">
      <Navbar />

      <div className="w-full flex items-center justify-center mb-4 animate-fade-in-down px-4">
        <img src={outputTitle} alt="Your Snaptify is Ready" className="h-8 sm:h-10 md:h-16 object-contain" />
      </div>

      {/* 2. Main Display Area */}
      <div className="relative w-full max-w-5xl flex flex-col items-center justify-center mb-5 px-4">
        
        {/* Cart Background - Responsive Width */}
        <div className="relative z-0 flex items-center justify-center">
            <img 
              src={cartBg} 
              alt="Cart" 
              className="w-[280px] sm:w-[350px] md:w-[400px] object-contain opacity-90"
            />
        </div>

        {/* The Visible Frame - Positioned inside the cart */}
        <div className="absolute top-[60%] sm:top-[75%] md:top-[70%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 pt-10 w-full flex justify-center">
            <div 
              className="relative p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] animate-fade-in scale-[0.55] sm:scale-[0.65]"
              style={{ 
                ...getFrameStyle(),
                transformOrigin: 'top center',
                backgroundColor: frameColor === 'white' ? '#ffffff' : '#000000'
              }}
            >
               <FrameContent />
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
          className="px-8 py-3 rounded-full bg-black text-white font-button font-semibold shadow-xl transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-wait"
        >
          {isDownloading ? 'Saving...' : 'Save'}
        </button>
      </div>

      {/* Hidden Print Area */}
      <div style={{ position: 'fixed', top: '-9999px', left: '-9999px', visibility: 'visible', pointerEvents: 'none' }}>
        <div
          ref={printRef}
          id="print-target"
          className="p-5"
          style={{ 
            ...getFrameStyle(),
            backgroundColor: frameColor === 'white' ? '#ffffff' : '#000000'
          }}
        >
          <FrameContent />
        </div>
      </div>

    </div>
  );
}