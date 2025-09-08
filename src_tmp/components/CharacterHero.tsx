import { useState } from 'react';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';
import { useRouter } from './Router';
import { ImageWithFallback } from './figma/ImageWithFallback';
import characterImage from 'figma:asset/319274f616a20039098e43622d14614ddc5240d6.png';

export function CharacterHero() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const { navigateTo } = useRouter();

  const handleCharacterClick = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 120);
    
    // Navigate to DApp
    setTimeout(() => {
      navigateTo('dapp');
    }, 300);
  };

  return (
    <div className="flex flex-col items-center relative px-4 sm:px-6">
      {/* Speech bubble badge */}
      <div className="mb-4 animate-bounce">
        <Badge className="bg-white/90 backdrop-blur-sm border-pink-200 text-gray-700 px-3 py-2 sm:px-4 sm:py-2 rounded-full shadow-lg relative text-sm sm:text-base">
          Tap to enter DApp
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white/90"></div>
        </Badge>
      </div>

      {/* Character container */}
      <div className="relative">
        <button
          className={`
            relative transition-all duration-200 ease-out cursor-pointer touch-manipulation
            ${isHovered ? 'scale-103' : 'scale-100'}
            ${isPressed ? 'scale-95' : ''}
            hover:drop-shadow-2xl active:scale-95
            min-h-[44px] min-w-[44px]
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={() => setIsPressed(true)}
          onMouseUp={() => setIsPressed(false)}
          onTouchStart={() => setIsPressed(true)}
          onTouchEnd={() => setIsPressed(false)}
          onClick={handleCharacterClick}
          style={{ animationDuration: '3s' }}
        >
          {/* Gentle floating animation */}
          <div className="animate-pulse">
            <ImageWithFallback
              src={characterImage}
              alt="Pouchy the character"
              className="w-48 h-36 sm:w-56 sm:h-42 md:w-64 md:h-48 lg:w-80 lg:h-60 object-contain drop-shadow-lg"
            />
          </div>

          {/* Hover glow effect */}
          <div className={`
            absolute inset-0 rounded-full transition-opacity duration-200
            ${isHovered ? 'opacity-20' : 'opacity-0'}
            bg-gradient-to-r from-pink-300 via-purple-300 to-cyan-300 blur-xl -z-10
            scale-110
          `}></div>
        </button>

        {/* Floating particles */}
        <div className="absolute -top-4 -left-4 w-2 h-2 bg-pink-300 rounded-full animate-ping opacity-60"></div>
        <div className="absolute -top-2 right-8 w-1 h-1 bg-cyan-300 rounded-full animate-pulse"></div>
        <div className="absolute bottom-4 -right-2 w-1.5 h-1.5 bg-purple-300 rounded-full animate-bounce"></div>
      </div>

      {/* Character info */}
      <div className="mt-6 sm:mt-8 text-center max-w-2xl">
        <h1 
          className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-2 xs:mb-3 sm:mb-4 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent leading-tight tracking-wide px-2"
          style={{ 
            fontFamily: 'Fredoka, system-ui, sans-serif',
            fontSize: 'clamp(1.25rem, 5vw, 3.5rem)',
            lineHeight: '1.1'
          }}
        >
          <span className="block xs:inline">Track smarter,</span>
          <span className="block xs:inline"> play cuter.</span>
        </h1>
        
        <p className="text-gray-600 mb-2 xs:mb-3 sm:mb-4 leading-relaxed px-2" style={{ fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)', lineHeight: '1.6' }}>
          Something magical is brewing in the world of DApps.
        </p>
        
        <p className="text-gray-600 mb-3 xs:mb-4 sm:mb-6 leading-relaxed px-2" style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', lineHeight: '1.5' }}>
          <span className="hidden sm:inline">Click the character to sneak into our beta preview—<br /></span>
          <span className="sm:hidden">Tap the character to enter<br />our beta preview. </span>
          <span className="hidden xs:inline">features will evolve, and you'll be part of the journey.</span>
          <span className="xs:hidden">Features evolve with you.</span>
        </p>
        
        <p className="text-xs sm:text-sm text-gray-500 tracking-wide px-2">
          <span className="hidden xs:inline">Limited beta · Your adventure starts now.</span>
          <span className="xs:hidden">Limited beta</span>
        </p>
      </div>
    </div>
  );
}