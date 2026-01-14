import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Background from '../components/Background';
import titleImg from '../assets/title.png'; 

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden">
      <Background />
      <Navbar />

      <div className="z-10 flex flex-col items-center gap-6 md:gap-8 animate-fade-in-down w-full px-4">
        
        {/* Responsive Title Image */}
        <img 
          src={titleImg} 
          alt="Snaptify" 
          className="w-[85%] sm:w-[60%] md:w-[50%] lg:w-[35%] object-contain drop-shadow-2xl"
        />

        {/* Responsive Button */}
        <button 
          onClick={() => navigate('/layout')}
          className="px-8 py-3 text-lg md:px-12 md:py-4 md:text-2xl font-bold text-white bg-black rounded-full shadow-2xl hover:scale-105 hover:bg-gray-900 transition-transform duration-300 ease-out cursor-pointer font-button"
        >
          Let's Start
        </button>
        
      </div>
    </div>
  );
}