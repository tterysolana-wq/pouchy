import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function CheeseCursorDemo() {
  const [clickCount, setClickCount] = useState(0);

  const handleDemoClick = () => {
    setClickCount(prev => prev + 1);
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    alert('Demo link clicked! 🧀');
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/30 max-w-xs">
      <div className="mb-4">
        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200 mb-3">
          🧀 Click to see bite!
        </Badge>
        <h3 className="text-lg font-medium mb-2">Cursor Demo</h3>
        <p className="text-sm text-gray-600 mb-4">
          Hover and click these elements to see the cheese cursor in action!
        </p>
      </div>

      <div className="space-y-3">
        {/* Demo Button */}
        <Button 
          onClick={handleDemoClick}
          className="w-full bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-500 hover:to-orange-500 text-white border-0"
        >
          Demo Button ({clickCount})
        </Button>

        {/* Demo Link */}
        <a 
          href="#demo" 
          onClick={handleLinkClick}
          className="block w-full p-3 text-center bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 text-blue-700 transition-colors"
        >
          Demo Link
        </a>

        {/* Character dummy */}
        <div 
          role="button"
          tabIndex={0}
          onClick={() => alert('Character clicked! 🎮')}
          className="w-full p-4 bg-gradient-to-br from-pink-100 to-purple-100 rounded-lg border border-pink-200 text-center cursor-pointer hover:from-pink-200 hover:to-purple-200 transition-all"
        >
          <div className="text-2xl mb-1">🐹</div>
          <div className="text-sm text-gray-700">Character Dummy</div>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center">
        Watch the cursor change on hover and click!
      </div>
    </div>
  );
}