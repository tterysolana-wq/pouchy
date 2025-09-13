import { useState, useRef } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Slider } from './ui/slider';

export function RetroTV() {
  const [isPlaying, setIsPlaying] = useState(true); // 자동 재생을 위해 true로 설정
  const [isMuted, setIsMuted] = useState(false); // 소리가 기본적으로 자동 재생되도록 false로 설정
  const [showControls, setShowControls] = useState(false);
  const [volume, setVolume] = useState(30); // 초기 볼륨을 30%로 설정
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
      // 뮤트 해제 시 볼륨도 함께 설정
      if (isMuted) {
        videoRef.current.volume = volume / 100;
      }
    }
  };

  const handleVolumeChange = (newVolume: number[]) => {
    const volumeValue = newVolume[0] / 100;
    setVolume(newVolume[0]);
    if (videoRef.current) {
      videoRef.current.volume = volumeValue;
      // 볼륨이 0이면 뮤트, 아니면 뮤트 해제
      if (newVolume[0] === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  // 비디오 로드 시 초기 볼륨 설정
  const handleVideoLoad = () => {
    if (videoRef.current) {
      videoRef.current.volume = volume / 100;
    }
  };

  return (
    <div className="fixed bottom-[33vh] left-8 z-30">
      {/* TV Container - Modern Minimal Design */}
      <div className="relative">
        {/* TV Body */}
        <div className="relative bg-gradient-to-b from-gray-50 via-white to-gray-100 rounded-2xl shadow-2xl border border-gray-200/50">
          {/* Main Body */}
          <div className="p-4">
            {/* Screen Container */}
            <div className="relative bg-gray-800 rounded-xl overflow-hidden shadow-inner border-2 border-gray-300/30 mb-4">
              {/* Screen Bezel */}
              <div className="relative bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 rounded-xl p-2">
                {/* Video Screen - 와이드 화면으로 변경 */}
                <div 
                  className="relative w-96 h-56 bg-black rounded-lg overflow-hidden cursor-pointer"
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                  onClick={handlePlayPause}
                >
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover rounded-lg"
                    loop
                    autoPlay
                    playsInline
                    muted={isMuted}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onLoadedData={handleVideoLoad}
                    preload="metadata"
                    poster="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjcyIiBoZWlnaHQ9IjUwNCIgdmlld0JveD0iMCAwIDY3MiA1MDQiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjY3MiIgaGVpZ2h0PSI1MDQiIGZpbGw9IiMwODA4MDgiLz48Y2lyY2xlIGN4PSIzMzYiIGN5PSIyNTIiIHI9IjYwIiBmaWxsPSIjNDA0MDQwIi8+PHBhdGggZD0iTTMwOCAyMjhsNzIgMjQtNzIgMjR2LTQ4eiIgZmlsbD0iIzllOWU5ZSIvPjwvc3ZnPg=="
                  >
                    <source src="https://www.dropbox.com/scl/fi/i7y2du9vq3sauadputqlh/202509051907-1.mp4?rlkey=wlvy1619e9hv38t1gfuz932wk&st=7gatpxhs&dl=1" type="video/mp4" />
                  </video>

                  {/* Modern Screen Effect */}
                  <div className="absolute inset-0 pointer-events-none rounded-lg">
                    {/* Subtle grain effect */}
                    <div className="w-full h-full opacity-5" style={{
                      background: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Ccircle cx='20' cy='20' r='0.5'/%3E%3Ccircle cx='60' cy='30' r='0.5'/%3E%3Ccircle cx='40' cy='60' r='0.5'/%3E%3Ccircle cx='80' cy='70' r='0.5'/%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                    {/* Screen gloss */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-lg"></div>
                  </div>

                  {/* Video Controls Overlay - 재생/일시정지만 */}
                  {showControls && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
                      <Button
                        size="lg"
                        variant="secondary"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPause();
                        }}
                        className="bg-white/95 hover:bg-white text-gray-800 rounded-full w-16 h-16 shadow-lg"
                      >
                        {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7 ml-1" />}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Control Panel with Volume */}
            <div className="space-y-3 mb-2">
              {/* Top row - Status indicators */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-4">
                  {/* Power indicator */}
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full shadow-lg shadow-green-400/50"></div>
                    <span className="text-gray-600 text-xs">ON</span>
                  </div>
                  
                  {/* Brand logo area */}
                  <div className="text-gray-400 text-xs tracking-wider">POUCHY VISION</div>
                  
                  {/* Volume level display */}
                  <div className="flex items-center gap-1">
                    <span className="text-gray-500 text-xs">VOL</span>
                    <span className="text-gray-600 text-xs min-w-[2rem] text-center">{volume}%</span>
                  </div>
                </div>
              </div>

              {/* Bottom row - Volume Controls */}
              <div className="flex items-center justify-center gap-4 px-4">
                {/* Mute button */}
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleMute}
                  className="h-8 w-8 p-0 text-gray-600 hover:text-gray-800 hover:bg-gray-100/50 rounded-full"
                >
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>

                {/* Volume Slider */}
                <div className="flex-1 max-w-32">
                  <Slider
                    value={[volume]}
                    onValueChange={handleVolumeChange}
                    max={100}
                    min={0}
                    step={5}
                    className="w-full"
                  />
                </div>

                {/* Volume indicators */}
                <div className="flex items-center gap-1">
                  <div className={`w-1 h-1 rounded-full transition-colors ${volume > 0 ? 'bg-gray-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-1 h-2 rounded-full transition-colors ${volume > 33 ? 'bg-gray-500' : 'bg-gray-300'}`}></div>
                  <div className={`w-1 h-3 rounded-full transition-colors ${volume > 66 ? 'bg-gray-500' : 'bg-gray-300'}`}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Stand */}
          <div className="relative">
            {/* Main stand base */}
            <div className="bg-gradient-to-b from-gray-100 to-gray-200 h-4 rounded-b-2xl shadow-inner border-t border-gray-200/50"></div>
            
            {/* Stand extension */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
              <div className="w-48 h-6 bg-gradient-to-b from-gray-200 via-gray-100 to-gray-50 rounded-full shadow-lg border border-gray-200/30"></div>
              {/* Stand feet */}
              <div className="absolute -bottom-1 left-4 w-5 h-2 bg-gray-300 rounded-full"></div>
              <div className="absolute -bottom-1 right-4 w-5 h-2 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* TV Shadow - 와이드 화면에 맞게 조정 */}
        <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 w-[28rem] h-10 bg-black/15 rounded-full blur-xl"></div>
      </div>
    </div>
  );
}