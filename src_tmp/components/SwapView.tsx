import { useState } from 'react';
import { ArrowDownUp, Settings, Info } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { toast } from 'sonner@2.0.3';

export function SwapView() {
  const [fromToken, setFromToken] = useState('SOL');
  const [toToken, setToToken] = useState('USDC');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [slippage, setSlippage] = useState('0.5');

  const tokens = [
    { symbol: 'SOL', name: 'Solana', price: 120.45 },
    { symbol: 'USDC', name: 'USD Coin', price: 1.00 },
    { symbol: 'RAY', name: 'Raydium', price: 0.71 },
    { symbol: 'ORCA', name: 'Orca', price: 1.76 },
    { symbol: 'SRM', name: 'Serum', price: 0.45 },
  ];

  const handleFromAmountChange = (value: string) => {
    setFromAmount(value);
    
    if (value && !isNaN(Number(value))) {
      const fromTokenPrice = tokens.find(t => t.symbol === fromToken)?.price || 0;
      const toTokenPrice = tokens.find(t => t.symbol === toToken)?.price || 0;
      
      if (toTokenPrice > 0) {
        const calculatedToAmount = (Number(value) * fromTokenPrice / toTokenPrice).toFixed(6);
        setToAmount(calculatedToAmount);
      }
    } else {
      setToAmount('');
    }
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    
    const tempAmount = fromAmount;
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwap = () => {
    if (!fromAmount || !toAmount) {
      toast("Invalid Amount", {
        description: "Please enter a valid swap amount.",
        duration: 3000,
      });
      return;
    }

    toast("Swap Initiated! 🔄", {
      description: `Swapping ${fromAmount} ${fromToken} for ${toAmount} ${toToken}`,
      duration: 4000,
    });
  };

  const getTokenFromSymbol = (symbol: string) => tokens.find(t => t.symbol === symbol);

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 
          className="text-3xl text-gray-800/90 mb-2"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Token Swap
        </h1>
        <p className="text-gray-600">Swap tokens instantly with the best rates</p>
      </div>

      {/* Swap Card */}
      <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
        {/* Settings */}
        <div className="flex justify-between items-center mb-6">
          <h2 
            className="text-lg text-gray-800/90"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            Swap
          </h2>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              Slippage: {slippage}%
            </Badge>
            <Button variant="ghost" size="sm" className="p-2">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* From Token */}
        <div className="space-y-4">
          <div className="bg-white/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">From</span>
              <span className="text-sm text-gray-600">
                Balance: {Math.random() * 100 + 1}
              </span>
            </div>
            <div className="flex gap-3">
              <Select value={fromToken} onValueChange={setFromToken}>
                <SelectTrigger className="w-32 bg-white/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="0.0"
                value={fromAmount}
                onChange={(e) => handleFromAmountChange(e.target.value)}
                className="bg-white/30 border-white/20 text-right"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {getTokenFromSymbol(fromToken)?.name}
              </span>
              <span className="text-xs text-gray-500">
                ${getTokenFromSymbol(fromToken)?.price}
              </span>
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleSwapTokens}
              className="w-10 h-10 rounded-full bg-white/30 hover:bg-white/40 p-0"
            >
              <ArrowDownUp className="w-4 h-4" />
            </Button>
          </div>

          {/* To Token */}
          <div className="bg-white/20 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">To</span>
              <span className="text-sm text-gray-600">
                Balance: {Math.random() * 100 + 1}
              </span>
            </div>
            <div className="flex gap-3">
              <Select value={toToken} onValueChange={setToToken}>
                <SelectTrigger className="w-32 bg-white/30">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tokens.map((token) => (
                    <SelectItem key={token.symbol} value={token.symbol}>
                      {token.symbol}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                placeholder="0.0"
                value={toAmount}
                readOnly
                className="bg-white/30 border-white/20 text-right"
              />
            </div>
            <div className="flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">
                {getTokenFromSymbol(toToken)?.name}
              </span>
              <span className="text-xs text-gray-500">
                ${getTokenFromSymbol(toToken)?.price}
              </span>
            </div>
          </div>
        </div>

        {/* Swap Info */}
        {fromAmount && toAmount && (
          <div className="mt-4 p-3 bg-blue-50/30 rounded-lg">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p>Rate: 1 {fromToken} = {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken}</p>
                <p className="text-xs text-gray-600 mt-1">
                  Including {slippage}% slippage tolerance
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={!fromAmount || !toAmount}
          className="w-full mt-6 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 py-6"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          <span className="text-lg">
            {fromAmount && toAmount ? `Swap ${fromToken} for ${toToken}` : 'Enter Amount'}
          </span>
        </Button>
      </Card>

      {/* Recent Swaps */}
      <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
        <h3 
          className="text-lg text-gray-800/90 mb-4"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Recent Swaps
        </h3>
        <div className="space-y-3">
          {[
            { from: 'SOL', to: 'USDC', amount: '1.5', time: '5 min ago' },
            { from: 'USDC', to: 'RAY', amount: '200', time: '1 hour ago' },
            { from: 'RAY', to: 'SOL', amount: '500', time: '3 hours ago' },
          ].map((swap, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-300 to-blue-300 rounded-full flex items-center justify-center">
                  <ArrowDownUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-gray-800/90" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                    {swap.from} → {swap.to}
                  </p>
                  <p className="text-sm text-gray-600">{swap.amount} {swap.from}</p>
                </div>
              </div>
              <span className="text-xs text-gray-500">{swap.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}