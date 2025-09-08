import { TrendingUp, DollarSign, Coins, Activity } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { useWallet } from './WalletProvider';

export function DashboardView() {
  const { balance } = useWallet();

  const mockData = {
    totalValue: balance * 120, // Mock portfolio value
    dayChange: Math.random() * 20 - 10, // Random % change
    tokens: [
      { symbol: 'SOL', amount: balance.toFixed(2), value: (balance * 120).toFixed(2), change: 5.2 },
      { symbol: 'USDC', amount: '450.00', value: '450.00', change: 0.1 },
      { symbol: 'RAY', amount: '125.50', value: '89.32', change: -2.4 },
      { symbol: 'ORCA', amount: '89.12', value: '156.78', change: 8.9 },
    ],
    recentActivity: [
      { type: 'Swap', from: 'SOL', to: 'USDC', amount: '0.5 SOL', time: '2 min ago' },
      { type: 'Transfer', from: 'USDC', to: 'External', amount: '100 USDC', time: '1 hour ago' },
      { type: 'Receive', from: 'External', to: 'SOL', amount: '2.3 SOL', time: '3 hours ago' },
    ]
  };

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 
          className="text-3xl text-gray-800/90 mb-2"
          style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
        >
          Dashboard
        </h1>
        <p className="text-gray-600">Welcome back! Here's your portfolio overview.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Portfolio Value</p>
              <p 
                className="text-2xl text-gray-800/90 mt-1"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                ${mockData.totalValue.toFixed(2)}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100/50 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">24h Change</p>
              <p 
                className={`text-2xl mt-1 ${mockData.dayChange >= 0 ? 'text-green-600' : 'text-red-500'}`}
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                {mockData.dayChange >= 0 ? '+' : ''}{mockData.dayChange.toFixed(2)}%
              </p>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              mockData.dayChange >= 0 ? 'bg-green-100/50' : 'bg-red-100/50'
            }`}>
              <TrendingUp className={`w-6 h-6 ${
                mockData.dayChange >= 0 ? 'text-green-600' : 'text-red-500'
              }`} />
            </div>
          </div>
        </Card>

        <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Tokens</p>
              <p 
                className="text-2xl text-gray-800/90 mt-1"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                {mockData.tokens.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100/50 rounded-xl flex items-center justify-center">
              <Coins className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Active Positions</p>
              <p 
                className="text-2xl text-gray-800/90 mt-1"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                3
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100/50 rounded-xl flex items-center justify-center">
              <Activity className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Holdings */}
        <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
          <h2 
            className="text-xl text-gray-800/90 mb-4"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            Token Holdings
          </h2>
          <div className="space-y-4">
            {mockData.tokens.map((token, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-pink-300 to-purple-300 rounded-full flex items-center justify-center">
                    <span className="text-xs text-white" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                      {token.symbol.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-gray-800/90" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                      {token.symbol}
                    </p>
                    <p className="text-sm text-gray-600">{token.amount}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-800/90">${token.value}</p>
                  <Badge 
                    variant={token.change >= 0 ? "secondary" : "destructive"} 
                    className="text-xs"
                  >
                    {token.change >= 0 ? '+' : ''}{token.change}%
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white/30 backdrop-blur-sm border-white/20 p-6">
          <h2 
            className="text-xl text-gray-800/90 mb-4"
            style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
          >
            Recent Activity
          </h2>
          <div className="space-y-4">
            {mockData.recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/20 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-300 to-blue-300 rounded-full flex items-center justify-center">
                    <Activity className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-800/90" style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                      {activity.type}
                    </p>
                    <p className="text-sm text-gray-600">
                      {activity.from} → {activity.to}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-800/90">{activity.amount}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}