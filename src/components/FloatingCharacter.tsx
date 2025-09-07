import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import characterImage from 'figma:asset/33f1917b596981f999905e148c709832bfe46b5a.png';

export function FloatingCharacter() {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Subtle floating movement
  useEffect(() => {
    const interval = setInterval(() => {
      setPosition({
        x: Math.sin(Date.now() * 0.001) * 3,
        y: Math.cos(Date.now() * 0.0015) * 2
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-20 pointer-events-none">
      <div 
        className="relative transition-all duration-700 ease-out pointer-events-auto cursor-pointer"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${isHovered ? 1.1 : 1})`,
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Soft glow background */}
        <div 
          className={`absolute inset-0 rounded-full transition-all duration-500 ${
            isHovered 
              ? 'bg-gradient-to-br from-yellow-200/40 via-orange-200/30 to-pink-200/40 blur-xl scale-150' 
              : 'bg-gradient-to-br from-yellow-200/20 via-orange-200/15 to-pink-200/20 blur-lg scale-125'
          }`}
          style={{ transform: 'translate(-10%, -10%)' }}
        />
        
        {/* Character container */}
        <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden">
          {/* Subtle backdrop blur */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-full border border-white/20" />
          
          {/* Character image */}
          <div className="relative w-full h-full p-1">
            <ImageWithFallback
              src={characterImage}
              alt="Pouchy Character"
              className="w-full h-full object-cover rounded-full scale-110"
            />
          </div>
          
          {/* Overlay gradient for blending */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-pink-100/20 rounded-full pointer-events-none" />
          
          {/* Subtle border glow */}
          <div 
            className={`absolute inset-0 rounded-full border-2 transition-all duration-300 ${
              isHovered 
                ? 'border-yellow-300/60 shadow-lg shadow-yellow-200/30' 
                : 'border-white/30 shadow-md shadow-pink-200/20'
            }`} 
          />
        </div>
        
        {/* Floating sparkles */}
        {isHovered && (
          <>
            <div className="absolute -top-2 -left-2 w-2 h-2 bg-yellow-300/80 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-3 w-1.5 h-1.5 bg-pink-300/80 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute -bottom-2 -right-1 w-1 h-1 bg-orange-300/80 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          </>
        )}
      </div>
      
      {/* Soft shadow */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-2 w-16 h-4 md:w-20 md:h-5 bg-black/10 rounded-full blur-sm" />
    </div>
  );
}