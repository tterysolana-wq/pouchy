import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { useRouter } from './Router';
import { useWallet } from './WalletProvider';
import { WalletConnect } from './WalletConnect';
import { 
  Search, 
  Filter, 
  TrendingUp, 
  Star, 
  Users, 
  DollarSign, 
  Sparkles,
  Home,
  Trophy,
  Gift,
  BookOpen,
  Twitter,
  Menu,
  X,
  ArrowLeft,
  Rocket,
  Clock,
  Target,
  Activity,
  Zap,
  Heart,
  Construction,
  Calendar
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import pouchyImage from 'figma:asset/e11dbdd445546ba420957e267139a89fb3f31091.png';

const backgroundImage = 'https://images.unsplash.com/photo-1720624226898-240e707b089a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0ZWwlMjBob3QlMjBhaXIlMjBiYWxsb29ucyUyMGNsb3VkcyUyMHNreSUyMGRyZWFteXxlbnwxfHx8fDE3NTcxNDA3Mjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';

// Mock data for hot projects
const hotProjects = [
  {
    id: 1,
    name: 'POUCHY',
    ticker: 'POUCHY',
    marketCap: '$456.8K',
    change: '+42.3%',
    logo: '🐾',
    live: true,
    color: 'from-pink-400 to-purple-400'
  },
  {
    id: 2,
    name: 'Cute Coin',
    ticker: 'CUTE',
    marketCap: '$234.2K',
    change: '+28.7%',
    logo: '🌸',
    live: true,
    color: 'from-blue-400 to-pink-400'
  },
  {
    id: 3,
    name: 'Kawaii Token',
    ticker: 'KWI',
    marketCap: '$189.5K',
    change: '+15.9%',
    logo: '✨',
    live: true,
    color: 'from-purple-400 to-blue-400'
  },
  {
    id: 4,
    name: 'Pastel Dreams',
    ticker: 'PST',
    marketCap: '$167.3K',
    change: '+8.2%',
    logo: '🎨',
    live: true,
    color: 'from-green-400 to-blue-400'
  }
];

const topTokens = [
  { name: 'POUCHY', value: 'Buy under 0.001 SOL' },
  { name: 'KAWAII', value: 'Buy under 0.005 SOL' },
  { name: 'BOOST', value: 'Sell 0.008 SOL' },
  { name: 'HARMZ', value: 'Sell 0.012 SOL' },
  { name: 'BOOM', value: 'Sell 0.006 SOL' }
];

const filterTags = [
  'pouchy buzz',
  'freshly peeled', 
  'about to ripen',
  'top bunch',
  'zest boosters',
  'ancient peels'
];

export function LaunchpadPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('pouchy buzz');
  const [showComingSoon, setShowComingSoon] = useState(false);
  const { navigateTo } = useRouter();
  const { isConnected } = useWallet();

  // Show coming soon modal when component mounts
  useEffect(() => {
    setShowComingSoon(true);
  }, []);

  const navigationItems = [
    { key: 'home', icon: Home, label: 'Home', action: () => navigateTo('landing') },
    { key: 'leaderboard', icon: Trophy, label: 'Leaderboard', action: () => {} },
    { key: 'rewards', icon: Gift, label: 'Rewards', action: () => {} },
    { key: 'revenue', icon: DollarSign, label: 'Revenue', action: () => {} },
    { key: 'docs', icon: BookOpen, label: 'Docs', action: () => window.open('https://pouchyai.github.io/pouchy-docs/', '_blank') },
  ];

  if (!isConnected) {
    return (
      <div 
        className="min-h-screen w-full relative overflow-hidden"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#B4E1FF',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-pink-50/30 to-purple-50/40 backdrop-blur-[0.5px]"></div>
        
        <div className="absolute top-2 left-2 xs:top-4 xs:left-4 sm:top-6 sm:left-6 z-50">
          <Button
            variant="secondary"
            onClick={() => navigateTo('landing')}
            className="bg-white/30 backdrop-blur-sm border-white/20 hover:bg-white/40 hover:shadow-lg hover:shadow-pink-200/20 transition-all duration-200 min-h-[40px] xs:min-h-[44px] touch-manipulation text-xs xs:text-sm px-2 xs:px-3 py-2"
          >
            <ArrowLeft className="w-3 h-3 xs:w-4 xs:h-4 mr-1 xs:mr-2" />
            <span className="hidden xs:inline">Back to Home</span>
            <span className="xs:hidden">Back</span>
          </Button>
        </div>

        <WalletConnect />
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#B4E1FF',
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/20 via-pink-50/15 to-purple-50/20"></div>
      
      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onOpenChange={setShowComingSoon}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl">
          <DialogHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="mx-auto w-20 h-20 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-full flex items-center justify-center shadow-lg"
            >
              <Construction className="w-10 h-10 text-white" />
            </motion.div>
            
            <DialogTitle 
              className="text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              Coming Soon! 🚀
            </DialogTitle>
            
            <DialogDescription 
              className="text-base text-gray-600 leading-relaxed"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              The Pouchy.fun Launchpad is currently under development. 
              We're building something amazing for you! 
              <br />
              <br />
              In the meantime, explore our powerful analytics tools.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3 mt-6">
            <Button
              onClick={() => {
                setShowComingSoon(false);
                navigateTo('dapp');
              }}
              className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <Target className="w-4 h-4 mr-2" />
              Go to Analytics
            </Button>
            
            <Button
              variant="outline"
              onClick={() => {
                setShowComingSoon(false);
                navigateTo('landing');
              }}
              className="border-gray-200 text-gray-600 hover:bg-gray-50"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              <Home className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
            
            <Button
              variant="ghost"
              onClick={() => setShowComingSoon(false)}
              className="text-gray-500 hover:bg-gray-50"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              Stay on Launchpad Preview
            </Button>
          </div>

          <div className="mt-6 p-4 bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-xl border border-pink-200/30">
            <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
              <Calendar className="w-4 h-4" />
              <span style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                Expected Launch: Q2 2025
              </span>
            </div>
            <p 
              className="text-xs text-gray-500"
              style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
            >
              Follow us for updates and early access announcements!
            </p>
          </div>
        </DialogContent>
      </Dialog>
      
      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <header className="w-full bg-gradient-to-r from-pink-400/90 via-purple-400/90 to-blue-400/90 backdrop-blur-md border-b border-white/30 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div 
                className="flex items-center gap-3"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-pink-500" />
                </div>
                <span 
                  className="text-xl font-bold text-white"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  Pouchy.fun
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center gap-6">
                {navigationItems.map(({ key, icon: Icon, label, action }) => (
                  <motion.button
                    key={key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={action}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </motion.button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={() => window.open('https://x.com/Pouchydotfun', '_blank')}
                >
                  <Twitter className="w-4 h-4" />
                </Button>
              </nav>

              {/* Action Buttons */}
              <div className="hidden lg:flex items-center gap-3">
                <Button 
                  className="bg-white/90 text-purple-600 hover:bg-white hover:shadow-lg transition-all duration-200"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <Rocket className="w-4 h-4 mr-2" />
                  Create
                </Button>
                <Button 
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  Login
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-white"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="lg:hidden bg-white/95 backdrop-blur-md border-t border-white/30 p-4"
            >
              <nav className="space-y-2">
                {navigationItems.map(({ key, icon: Icon, label, action }) => (
                  <button
                    key={key}
                    onClick={action}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 transition-all duration-200"
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  >
                    <Icon className="w-5 h-5 text-purple-600" />
                    <span className="text-gray-700">{label}</span>
                  </button>
                ))}
              </nav>
              <div className="flex gap-2 mt-4 pt-4 border-t border-gray-200">
                <Button 
                  className="flex-1 bg-purple-600 hover:bg-purple-700"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  Create
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  Login
                </Button>
              </div>
            </motion.div>
          )}
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h1 
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <span className="text-gray-800">Create, trade and reward</span>
                  <br />
                  <span className="text-gray-700">- built for speed on</span>
                  <br />
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Pouchy.fun
                  </span>
                </h1>
                
                <p 
                  className="text-lg text-gray-600 max-w-lg leading-relaxed"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  A fun-first launchpad with live leaderboards, juicy rewards, and 
                  instant creation. Keep the vibe, ship faster.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <Rocket className="w-5 h-5 mr-2" />
                  Create Coin
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  <Search className="w-5 h-5 mr-2" />
                  Browse Tokens
                </Button>
              </div>

              <div className="flex items-center gap-2 text-sm text-green-600">
                <Activity className="w-4 h-4" />
                <span style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>
                  Live activity updating in real time
                </span>
              </div>
            </motion.div>

            {/* Pouchy Character */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Floating background circles */}
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, 180, 360] 
                  }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-200/40 to-purple-200/40 rounded-full blur-xl"
                />
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [360, 180, 0] 
                  }}
                  transition={{ 
                    duration: 10, 
                    repeat: Infinity, 
                    ease: "linear" 
                  }}
                  className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-blue-200/40 to-pink-200/40 rounded-full blur-xl"
                />

                {/* Main character container */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ 
                    y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    scale: { duration: 0.3 }
                  }}
                  className="relative w-80 h-80 bg-gradient-to-br from-white/60 via-pink-50/50 to-purple-50/50 backdrop-blur-lg rounded-full border border-white/40 shadow-2xl flex items-center justify-center"
                >
                  <div className="w-64 h-64 bg-white/90 rounded-full border-4 border-white/70 shadow-2xl flex items-center justify-center relative overflow-hidden">
                    <div className="w-56 h-56 rounded-full overflow-hidden border-2 border-pink-200/30">
                      <ImageWithFallback
                        src={pouchyImage}
                        alt="Pouchy Character"
                        className="w-full h-full object-cover scale-105"
                      />
                    </div>
                    
                    {/* Sparkle effects */}
                    <motion.div
                      animate={{ 
                        scale: [0, 1, 0],
                        rotate: [0, 180, 360] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: 0.5 
                      }}
                      className="absolute top-4 right-4"
                    >
                      <Sparkles className="w-6 h-6 text-yellow-400" />
                    </motion.div>
                    <motion.div
                      animate={{ 
                        scale: [0, 1, 0],
                        rotate: [0, -180, -360] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: 1.5 
                      }}
                      className="absolute bottom-6 left-6"
                    >
                      <Star className="w-4 h-4 text-pink-400 fill-pink-400" />
                    </motion.div>
                  </div>

                  {/* Token indicator */}
                  <div className="absolute -top-2 -right-2 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg border border-white/40">
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <span className="text-white text-sm font-bold">🐾</span>
                      </div>
                      <span 
                        className="text-xs text-gray-600 font-medium"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        POUCHY TOKEN
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Search and Filter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-6 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="flex-1 w-full lg:w-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    placeholder="Search tokens"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 text-base border-gray-200 focus:border-purple-400 focus:ring-purple-400"
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Filter className="w-4 h-4" />
                  <span style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}>Filter:</span>
                </div>
                
                {filterTags.map((tag) => (
                  <Badge
                    key={tag}
                    variant={selectedFilter === tag ? "default" : "secondary"}
                    className={`cursor-pointer transition-all duration-200 ${
                      selectedFilter === tag 
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white' 
                        : 'hover:bg-gray-200'
                    }`}
                    onClick={() => setSelectedFilter(tag)}
                    style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                  >
                    {tag}
                  </Badge>
                ))}
                
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-purple-600 hover:bg-purple-50"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  All Tokens
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Top Tokens Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12"
          >
            {topTokens.map((token, index) => (
              <div
                key={token.name}
                className="bg-gradient-to-br from-white/60 to-white/40 backdrop-blur-sm rounded-xl border border-white/40 p-4 text-center hover:shadow-lg transition-all duration-200"
              >
                <div 
                  className="font-bold text-gray-800 mb-1"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  {token.name}
                </div>
                <div 
                  className="text-sm text-gray-600"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  {token.value}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Hot Projects Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/40 shadow-xl p-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-pink-500" />
                <h2 
                  className="text-2xl font-bold text-gray-800"
                  style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                >
                  Hot Projects
                </h2>
              </div>
              <Badge 
                variant="secondary" 
                className="bg-green-100 text-green-700 border-green-200"
                style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
              >
                <Clock className="w-3 h-3 mr-1" />
                LIVE
              </Badge>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/90 backdrop-blur-sm rounded-xl border border-white/40 p-5 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${project.color} rounded-full flex items-center justify-center text-2xl shadow-lg`}>
                      {project.logo}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 
                        className="font-bold text-gray-800 truncate"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        {project.name}
                      </h3>
                      <p 
                        className="text-sm text-gray-500"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        {project.ticker}
                      </p>
                    </div>
                    {project.live && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span 
                        className="text-sm text-gray-600"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        Market Cap:
                      </span>
                      <span 
                        className="font-bold text-gray-800"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        {project.marketCap}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span 
                        className="text-sm text-gray-600"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        24h Change:
                      </span>
                      <Badge 
                        variant="secondary" 
                        className="bg-green-100 text-green-700 border-green-200"
                        style={{ fontFamily: 'Fredoka, system-ui, sans-serif' }}
                      >
                        <TrendingUp className="w-3 h-3 mr-1" />
                        {project.change}
                      </Badge>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-3">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.random() * 80 + 20}%` }}
                        transition={{ duration: 1, delay: 1 + index * 0.1 }}
                        className={`h-full bg-gradient-to-r ${project.color} rounded-full`}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </main>

        {/* Back to Analytics Button */}
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            onClick={() => navigateTo('dapp')}
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-full w-14 h-14"
          >
            <Target className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}