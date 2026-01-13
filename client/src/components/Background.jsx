import { useEffect, useState } from 'react';
import icon1 from '../assets/icon-1.png';
import icon2 from '../assets/icon-2.png';
import icon3 from '../assets/icon-3.png';
import icon4 from '../assets/icon-4.png';
import icon5 from '../assets/icon-5.png';
import icon6 from '../assets/icon-6.png';
import icon7 from '../assets/icon-7.png';
import icon8 from '../assets/icon-8.png';
import icon9 from '../assets/icon-9.png';

const iconData = [
  { src: icon1, top: '10%', left: '5%', width: '90px', delay: '0s', duration: '15s' },
  { src: icon2, top: '10%', left: '80%', width: '100px', delay: '2s', duration: '18s' },
  { src: icon3, top: '30%', left: '15%', width: '100px', delay: '1s', duration: '20s' },
  { src: icon4, top: '40%', left: '90%', width: '120px', delay: '4s', duration: '14s' },
  { src: icon5, top: '70%', left: '65%', width: '95px', delay: '0s', duration: '22s' },
  { src: icon6, top: '75%', left: '10%', width: '90px', delay: '3s', duration: '16s' },
  { src: icon7, top: '75%', left: '85%', width: '90px', delay: '1s', duration: '19s' },
  { src: icon8, top: '85%', left: '40%', width: '85px', delay: '5s', duration: '17s' },
  { src: icon9, top: '10%', left: '60%', width: '90px', delay: '2s', duration: '21s' },
];

export default function Background() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden -z-10 pointer-events-none bg-lightWhite `}>
      
      {/* Fixed Position Icons */}
      {iconData.map((icon, index) => (
        <img
          key={index}
          src={icon.src}
          alt=""
          className="absolute animate-float"
          style={{
            top: icon.top,
            left: icon.left,
            width: icon.width,
            animationDelay: icon.delay,
            animationDuration: icon.duration,
          }}
        />
      ))}
      
      <div className="absolute inset-0"></div>
    </div>
  );
}