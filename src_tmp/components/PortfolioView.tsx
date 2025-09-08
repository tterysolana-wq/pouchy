import { Eye, EyeOff, Send, Plus, TrendingUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useWallet } from './WalletProvider';

export function PortfolioView() {
  const [hideBalances, setHideBalances] = useState(false);
  const { balance } = useWallet();

  const portfolioData = {
    totalValue: balance * 120,
    totalChange24h: Math.random() * 20 - 10,
    tokens: [
      { 
        symbol: 'SOL', 
        name: 'Solana',
        amount: balance.toFixed(6), 
        value: (balance * 120).toFixed(2), 
        change: 5.2,
        price: 120.45,
        allocation: 65
      },
      { 
        symbol: 'USDC', 
        name: 'USD Coin',
        amount: '450.000000', 
        value: '450.00', 
        change: 0.1,
        price: 1.00,
        allocation: 25
      },
      { 
        symbol: 'RAY', 
        name: 'Raydium',
        amount: '125.500000', 
        value: '89.32', 
        change: -2.4,
        price: 0.71,
        allocation: 7
      },
      { 
        symbol: 'ORCA', 
        name: 'Orca',
        amount: '89.120000', 
        value: '156.78', 
        change: 8.9,
        price: 1.76,
        allocation: 3
      },
    ],
    nfts: [
      { name: 'Mad Lads #1234', collection: 'Mad Lads', floorPrice: 45.2 },
      { name: 'Solana Monkey #5678', collection: 'SMB', floorPrice: 12.8 },
      { name: 'DeGods #9012', collection: 'DeGods', floorPrice: 89.5 },
    ]
  };

  const formatValue = (value: string | number) => {
    if (hideBalances) return '••••';
    return typeof value === 'string' ? value : value.toFixed(2);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 
            className="text-3xl text-gray-800/90 mb-2"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            Portfolio
          </h1>
          <p className="text-gray-600">Manage your digital assets</p>
        </div>
        
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={() => setHideBalances(!hideBalances)}
            className="bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40"
          >
            {hideBalances ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
          </Button>
          <Button className="bg-gradient-to-r from-pink-400 to-purple-400 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Token
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-gray-600 text-sm">Total Portfolio Value</p>
            <p 
              className="text-3xl text-gray-800/90 mt-1"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              ${formatValue(portfolioData.totalValue)}
            </p>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">24h Change</p>
            <div className="flex items-center gap-2 mt-1">
              <TrendingUp className={`w-5 h-5 ${
                portfolioData.totalChange24h >= 0 ? 'text-green-600' : 'text-red-500'
              }`} />
              <p 
                className={`text-2xl ${
                  portfolioData.totalChange24h >= 0 ? 'text-green-600' : 'text-red-500'
                }`}
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                {portfolioData.totalChange24h >= 0 ? '+' : ''}{formatValue(portfolioData.totalChange24h)}%
              </p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-600 text-sm">Total Tokens</p>
            <p 
              className="text-3xl text-gray-800/90 mt-1"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              {portfolioData.tokens.length}
            </p>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Token Holdings */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h2 
              className="text-xl text-gray-800/90"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              Token Holdings
            </h2>
            <Button variant="ghost" size="sm">
              <Send className="w-4 h-4 mr-2" />
              Send
            </Button>
          </div>

          {portfolioData.tokens.map((token, index) => (
            <Card key={index} className="bg-white/30 backdrop-blur-sm border-white/20 p-4 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-pink-300 via-purple-300 to-cyan-300 rounded-full flex items-center justify-center">
                    <span 
                      className="text-white"
                      style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                    >
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 
                        className="text-lg text-gray-800/90"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        {token.symbol}
                      </h3>
                      <Badge 
                        variant={token.change >= 0 ? "secondary" : "destructive"} 
                        className="text-xs"
                      >
                        {token.change >= 0 ? '+' : ''}{token.change}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{token.name}</p>
                    <p className="text-xs text-gray-500 font-mono">
                      {formatValue(token.amount)} {token.symbol}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p 
                    className="text-lg text-gray-800/90"
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  >
                    ${formatValue(token.value)}
                  </p>
                  <p className="text-sm text-gray-600">
                    ${formatValue(token.price)}
                  </p>
                  <div className="w-20 h-1 bg-gray-200 rounded-full mt-2">
                    <div 
                      className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
                      style={{ width: `${token.allocation}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* NFT Collection */}
        <div className="space-y-4">
          <h2 
            className="text-xl text-gray-800/90"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            NFT Collection
          </h2>
          
          {portfolioData.nfts.map((nft, index) => (
            <Card key={index} className="bg-white/30 backdrop-blur-sm border-white/20 p-4 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-lg flex items-center justify-center">
                  <span className="text-xs text-white">NFT</span>
                </div>
                
                <div className="flex-1">
                  <p 
                    className="text-sm text-gray-800/90"
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  >
                    {nft.name}
                  </p>
                  <p className="text-xs text-gray-600">{nft.collection}</p>
                  <p className="text-xs text-gray-500">
                    Floor: {formatValue(nft.floorPrice)} SOL
                  </p>
                </div>
              </div>
            </Card>
          ))}

          <Button 
            variant="secondary"
            className="w-full bg-white/20 backdrop-blur-sm border-white/20 hover:bg-white/30"
          >
            <Plus className="w-4 h-4 mr-2" />
            View All NFTs
          </Button>
        </div>
      </div>
    </div>
  );
}