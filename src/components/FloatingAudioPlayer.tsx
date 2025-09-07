import { useState } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';
import { Card } from './ui/card';

export function FloatingAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [progress, setProgress] = useState([25]);
  const [isMuted, setIsMuted] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would control actual audio playback
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (value: number[]) => {
    setProgress(value);
    // In a real app, this would seek to the position
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className="bg-white/90 backdrop-blur-lg border-white/30 shadow-xl p-4 rounded-2xl min-w-[280px]">
        {/* Track info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-pink-300 to-purple-300 flex items-center justify-center">
            <span className="text-white text-xs">♪</span>
          </div>
          <div className="flex-1">
            <div className="text-sm tracking-wide">Pouchy Theme</div>
            <div className="text-xs text-gray-500">Character BGM</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            value={progress}
            onValueChange={handleProgressChange}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0:32</span>
            <span>2:15</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            className="hover:bg-pink-100 hover:text-pink-600 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>

          <div className="flex items-center gap-2 flex-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleMute}
              className="hover:bg-pink-100 hover:text-pink-600 transition-colors"
            >
              {isMuted || volume[0] === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </Button>
            <Slider
              value={isMuted ? [0] : volume}
              onValueChange={setVolume}
              max={100}
              step={1}
              className="flex-1 max-w-16"
            />
          </div>
        </div>

        {/* Tooltip */}
        <div className="text-xs text-gray-500 mt-2 text-center">
          Autoplay off • Click to play
        </div>
      </Card>
    </div>
  );
}