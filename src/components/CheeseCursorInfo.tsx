import { Card } from './ui/card';
import { Badge } from './ui/badge';

export function CheeseCursorInfo() {
  return (
    <div className="fixed top-6 right-6 z-40 max-w-sm">
      <Card className="bg-white/95 backdrop-blur-sm border-yellow-200 shadow-xl p-4 rounded-2xl">
        <div className="mb-3">
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300 mb-2">
            🧀 Cheese Cursor System
          </Badge>
          <h3 className="text-lg font-medium mb-2">Interactive Demo</h3>
        </div>
        
        <div className="space-y-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-100 rounded border border-yellow-300 flex items-center justify-center text-xs">🧀</div>
            <span className="text-gray-700">Default: Triangle cheese cursor</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-100 rounded border border-yellow-300 flex items-center justify-center text-xs">✨</div>
            <span className="text-gray-700">Hover: Cheese + sparkles</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-100 rounded border border-yellow-300 flex items-center justify-center text-xs">🥄</div>
            <span className="text-gray-700">Click: Bite taken (120ms)</span>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-xs text-yellow-800 font-medium mb-1">Cursor Exports</div>
          <div className="text-xs text-yellow-700 space-y-1">
            <div>• cheese-32.png (1x)</div>
            <div>• cheese-64.png (2x)</div>
            <div>• cheese-bite-32.png</div>
            <div>• cheese-hover-32.png</div>
          </div>
        </div>
        
        <div className="mt-3 text-xs text-gray-500">
          Hotspot: (12,12) • Colors: #FFD54A base, #FFF2B3 highlight
        </div>
      </Card>
    </div>
  );
}