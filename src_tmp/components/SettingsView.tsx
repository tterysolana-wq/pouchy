import { Bell, Shield, Globe, Palette, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { Badge } from './ui/badge';
import { useWallet } from './WalletProvider';
import { toast } from 'sonner@2.0.3';

export function SettingsView() {
  const { disconnectWallet, walletType } = useWallet();
  const [notifications, setNotifications] = useState(true);
  const [autoApprove, setAutoApprove] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [slippageTolerance, setSlippageTolerance] = useState([0.5]);
  const [gasPrice, setGasPrice] = useState(['standard']);

  const handleSaveSettings = () => {
    toast("Settings Saved! ⚙️", {
      description: "Your preferences have been updated successfully.",
      duration: 3000,
    });
  };

  const handleResetSettings = () => {
    setNotifications(true);
    setAutoApprove(false);
    setDarkMode(false);
    setLanguage('en');
    setSlippageTolerance([0.5]);
    setGasPrice(['standard']);
    
    toast("Settings Reset", {
      description: "All settings have been reset to default values.",
      duration: 3000,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 
          className="text-3xl text-gray-800/90 mb-2"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Settings
        </h1>
        <p className="text-gray-600">Customize your DApp experience</p>
      </div>

      {/* Wallet Settings */}
      <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 
            className="text-xl text-gray-800/90"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            Wallet & Security
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
            <div>
              <p className="text-gray-800/90" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                Connected Wallet
              </p>
              <p className="text-sm text-gray-600 capitalize">
                {walletType} Wallet
              </p>
            </div>
            <Badge variant="secondary" className="bg-green-100/50 text-green-700">
              Connected
            </Badge>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
            <div>
              <p className="text-gray-800/90" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                Auto-approve transactions
              </p>
              <p className="text-sm text-gray-600">
                Skip confirmation for small transactions
              </p>
            </div>
            <Switch 
              checked={autoApprove}
              onCheckedChange={setAutoApprove}
            />
          </div>

          <Button 
            variant="destructive"
            onClick={disconnectWallet}
            className="w-full"
          >
            Disconnect Wallet
          </Button>
        </div>
      </Card>

      {/* Trading Settings */}
      <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Palette className="w-5 h-5 text-purple-600" />
          <h2 
            className="text-xl text-gray-800/90"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            Trading Preferences
          </h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <div className="flex justify-between items-center mb-3">
              <label className="text-gray-800/90" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                Slippage Tolerance
              </label>
              <span className="text-sm text-gray-600">{slippageTolerance[0]}%</span>
            </div>
            <Slider
              value={slippageTolerance}
              onValueChange={setSlippageTolerance}
              max={5}
              min={0.1}
              step={0.1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>0.1%</span>
              <span>5%</span>
            </div>
          </div>

          <div>
            <label className="text-gray-800/90 mb-3 block" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
              Transaction Priority
            </label>
            <Select value={gasPrice[0]} onValueChange={(value) => setGasPrice([value])}>
              <SelectTrigger className="bg-white/30 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">
                  <div className="flex items-center justify-between w-full">
                    <span>Slow</span>
                    <span className="text-xs text-gray-500 ml-4">~30s</span>
                  </div>
                </SelectItem>
                <SelectItem value="standard">
                  <div className="flex items-center justify-between w-full">
                    <span>Standard</span>
                    <span className="text-xs text-gray-500 ml-4">~15s</span>
                  </div>
                </SelectItem>
                <SelectItem value="fast">
                  <div className="flex items-center justify-between w-full">
                    <span>Fast</span>
                    <span className="text-xs text-gray-500 ml-4">~5s</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* App Preferences */}
      <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
        <div className="flex items-center gap-3 mb-4">
          <Globe className="w-5 h-5 text-green-600" />
          <h2 
            className="text-xl text-gray-800/90"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            App Preferences
          </h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-gray-800/90" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                  Push Notifications
                </p>
                <p className="text-sm text-gray-600">
                  Get notified about transactions and price alerts
                </p>
              </div>
            </div>
            <Switch 
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <div className="flex items-center justify-between p-4 bg-white/20 rounded-lg">
            <div className="flex items-center gap-3">
              {darkMode ? <Moon className="w-5 h-5 text-blue-600" /> : <Sun className="w-5 h-5 text-yellow-600" />}
              <div>
                <p className="text-gray-800/90" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                  Dark Mode
                </p>
                <p className="text-sm text-gray-600">
                  Switch to dark theme
                </p>
              </div>
            </div>
            <Switch 
              checked={darkMode}
              onCheckedChange={setDarkMode}
            />
          </div>

          <div className="p-4 bg-white/20 rounded-lg">
            <label className="text-gray-800/90 mb-3 block" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
              Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="bg-white/30 border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
                <SelectItem value="fr">Français</SelectItem>
                <SelectItem value="de">Deutsch</SelectItem>
                <SelectItem value="ja">日本語</SelectItem>
                <SelectItem value="ko">한국어</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button 
          onClick={handleSaveSettings}
          className="flex-1 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 text-white border-0"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Save Settings
        </Button>
        
        <Button 
          variant="secondary"
          onClick={handleResetSettings}
          className="bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}