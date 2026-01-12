import { useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import logo from '../assets/logo.png'; 

export default function Home() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false); 

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleStart = () => {
    navigate('/layout');
  };

  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-center z-10 px-4">
      
      {/* Logo Section */}
      <div className={`transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <img 
          src={logo} 
          alt="Brand Logo" 
          className="w-80 md:w-100 h-auto object-contain" 
        />
      </div>

      {/* Description Section */}
      <div className={`text-center space-y-5 max-w-2xl mb-10 transition-all duration-1000 delay-300 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <p className="text-lg md:text-xl font-body text-black">
           is the ultimate Gen-Z photobooth experience that combines creativity, music, and memories in one seamless platform. Personalize each shot by searching for your favorite song, which automatically generates a scannable Spotify code embedded into the photo.
        </p>
        <p className="text-lg md:text-xl font-body text-black">
          Share your moments instantly with friends, keep them as digital keepsakes, or let your photos tell a story paired with music.
        </p>
      </div>

      {/* CTA Button */}
      <button 
        onClick={handleStart}
        className={`px-8 py-3 bg-black text-white font-button font-semibold rounded-full shadow-lg hover:bg-black transition-all duration-1000 delay-500 ease-out transform hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        Snap Now
      </button>

    </section>
  );
}