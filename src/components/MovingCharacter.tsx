import { useState } from 'react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function MovingCharacter() {
  const [isHovered, setIsHovered] = useState(false);

  const handleCharacterClick = () => {
    // Show coming soon toast
    toast("Coming Soon! 🎉", {
      description: "The DApp is still in development. Stay tuned!",
      duration: 3000,
    });
  };

  return (
    <motion.div 
      className="fixed bottom-8 z-20"
      initial={{ x: "calc(100vw - 8rem)" }}
      animate={{
        x: [
          "calc(100vw - 8rem)",
          "2rem", 
          "calc(100vw - 8rem)"
        ],
        scaleX: [1, -1, 1]
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        times: [0, 0.5, 1]
      }}
    >
      {/* Moving Character */}
      <div className="relative">
        <motion.button
          className="relative cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleCharacterClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Character Image */}
          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1573151912499-bb62a4c9385e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXBlcmhlcm8lMjBoYW1zdGVyJTIwY2FydG9vbiUyMGNoYXJhY3RlciUyMGZseWluZ3xlbnwxfHx8fDE3NTcwODYyNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Flying Character"
              className="w-24 h-24 md:w-32 md:h-32 object-contain drop-shadow-lg rounded-full"
            />
            
            {/* Hover glow effect */}
            <motion.div 
              className="absolute inset-0 rounded-full bg-gradient-to-r from-red-300 via-orange-300 to-yellow-300 blur-lg -z-10 scale-125"
              animate={{ opacity: isHovered ? 0.3 : 0 }}
              transition={{ duration: 0.2 }}
            />
          </div>
        </motion.button>

        {/* Flying trail particles */}
        <motion.div 
          className="absolute top-1/2 -left-8 transform -translate-y-1/2"
          animate={{ 
            y: [-5, 5, -5],
            opacity: [0.6, 0.3, 0.6] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        >
          <div className="w-2 h-2 bg-red-300 rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="absolute top-1/3 -left-12 transform -translate-y-1/2"
          animate={{ 
            y: [5, -5, 5],
            opacity: [0.4, 0.2, 0.4] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        >
          <div className="w-1 h-1 bg-orange-300 rounded-full"></div>
        </motion.div>
        
        <motion.div 
          className="absolute top-2/3 -left-6 transform -translate-y-1/2"
          animate={{ 
            y: [-3, 3, -3],
            opacity: [0.5, 0.25, 0.5] 
          }}
          transition={{ 
            duration: 1.8, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2
          }}
        >
          <div className="w-1.5 h-1.5 bg-yellow-300 rounded-full"></div>
        </motion.div>
      </div>
    </motion.div>
  );
}