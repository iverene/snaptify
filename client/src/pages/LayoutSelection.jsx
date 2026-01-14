import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import layoutTitle from '../assets/layout-text.png'; 
import corkboardBg from '../assets/corkboard.png'; 

export default function LayoutSelection() {
  const navigate = useNavigate();
  const [selectedLayout, setSelectedLayout] = useState(null);

  // Configuration for the layout options
  const layoutOptions = [
    { 
      id: 'single', 
      type: 'polaroid', 
      label: '1 Photo', 
      rotate: '-rotate-6', 
      position: 'top-[20%] left-[10%]' 
    },
    { 
      id: 'strip-3', 
      type: 'strip', 
      count: 3, 
      label: '3 Photos', 
      rotate: 'rotate-3', 
      position: 'top-[15%] left-[45%]' 
    },
    { 
      id: 'strip-4', 
      type: 'strip', 
      count: 4, 
      label: '4 Photos', 
      rotate: '-rotate-2', 
      position: 'top-[20%] right-[10%]' 
    },
    { 
      id: 'grid-2x2', 
      type: 'grid', 
      label: '2x2 Grid', 
      rotate: 'rotate-8', 
      position: 'bottom-[20%] left-[25%]' 
    },
    { 
      id: 'grid-2x3', 
      type: 'grid-2x3', 
      label: '2x3 Grid', 
      rotate: '-rotate-3', 
      position: 'bottom-[10%] right-[24%]' 
    },
  ];

  const handleSnap = () => {
    if (selectedLayout) {
      navigate('/capture', { state: { layout: selectedLayout } });
    } else {
      alert("Please select a layout first!");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center pt-20 pb-5">
      <Navbar />

      {/* 1. Header Image */}
      <div className="mb-4 animate-fade-in-down px-4">
        <img 
          src={layoutTitle} 
          alt="Choose a layout" 
          className="h-10 md:h-14 lg:h-16 object-contain"
        />
      </div>

      {/* 2. Corkboard Container */}
      {/* Increased width on mobile (w-[95%]) to ensure buttons fit */}
      <div className="relative w-[95%] sm:w-[85%] md:w-[60%] lg:w-[45%] max-w-5xl shadow-2xl">
        
        <img 
          src={corkboardBg} 
          alt="Background" 
          className="w-full h-auto block rounded-sm"
        />

        {/* Buttons Layer */}
        <div className="absolute inset-0 w-full h-full p-4">
          {layoutOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setSelectedLayout(option.id)}
              className={`absolute transition-all duration-300 transform hover:scale-110 focus:outline-none ${option.position} ${option.rotate}
                ${selectedLayout === option.id ? 'scale-110 z-20' : 'hover:z-10'}
              `}
            >
              <div className={`shadow-xl transition-all ${selectedLayout === option.id ? 'ring-2 ring-black' : ''}`}>
                
                {/* POLAROID */}
                {option.type === 'polaroid' && (
                  <div className="bg-white p-2 pb-6 w-16 sm:w-20 md:w-28 flex flex-col items-center">
                    <div className="w-full aspect-square bg-gray-200 border border-gray-300"></div>
                  </div>
                )}

                {/* STRIP */}
                {option.type === 'strip' && (
                  <div className="bg-white p-1.5 pb-6 w-10 sm:w-14 md:w-20 flex flex-col gap-1.5">
                    {[...Array(option.count)].map((_, i) => (
                      <div key={i} className="w-full aspect-4/3 bg-gray-200 border border-gray-300"></div>
                    ))}
                  </div>
                )}

                {/* GRID 2x2 */}
                {option.type === 'grid' && (
                  <div className="bg-white p-1.5 pb-6 w-16 sm:w-20 md:w-28">
                    <div className="grid grid-cols-2 gap-1.5">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-full aspect-square bg-gray-200 border border-gray-300"></div>
                      ))}
                    </div>
                  </div>
                )}

                {/* GRID 2x3 */}
                {option.type === 'grid-2x3' && (
                  <div className="bg-white p-1.5 pb-6 w-20 sm:w-24 md:w-32">
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="w-full aspect-square bg-gray-200 border border-gray-300"></div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
              
              {/* Selected Label */}
              {selectedLayout === option.id && (
                 <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap pointer-events-none">
                   {option.label}
                 </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* 3. CTA Button */}
      <div className="mt-8">
        <button 
          onClick={handleSnap}
          disabled={!selectedLayout}
          className={`px-10 py-3 rounded-full font-bold text-lg shadow-xl transition-all transform 
            ${selectedLayout 
              ? 'bg-black text-white hover:scale-105 cursor-pointer' 
              : 'bg-gray-400 text-gray-500 cursor-not-allowed'}
          `}
        >
          Let's Snap
        </button>
      </div>

    </div>
  );
}