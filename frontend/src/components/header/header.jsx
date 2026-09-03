import { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const navigate = useNavigate();

  // Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Format Date: MON, 24 AUG 2026
  const formatDate = (date) => {
    const options = { weekday: 'short', day: '2-digit', month: 'short', year: 'numeric' };
    return date.toLocaleDateString('bn-BD', { ...options, year: 'numeric' });
  };

  // Format Time: 15:43:56
  const formatTime = (date) => {
    return date.toLocaleTimeString('bn-BD', { hour12: false });
  };

  // Navigation Items with URL Paths
  const navItems = [
    { name: 'প্রচ্ছদ', path: '/' },
    { name: 'সম্পাদকীয়', path: '/editorials' },
    { name: 'মতামত', path: '/opinion' },
    { name: 'ফিচার', path: '/feature' },
    // { name: 'Archive', path: '/archive' },
    { name: 'আমাদের কথা', path: '/about-us' },
  ];

  return (
    <header className="public-header w-full text-gray-800 border-b border-gray-200 font-sans sticky top-0 z-50">
      {/* Animation Keyframes Style Tag */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-track1 {
          animation: marquee 25s linear infinite;
        }
        .animate-marquee-track2 {
          animation: marquee2 25s linear infinite;
        }
      `}</style>

      {/* Top Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section with Link */}
          <Link to="/" className="flex items-center space-x-3 cursor-pointer">
            <div className="brand-mark w-12 h-12 rounded-full overflow-hidden" >
              <img src="/img/Capture-Photoroom.png" alt="আজাদ বাংলাদেশ লোগো" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-xl font-serif font-bold tracking-tight text-gray-900">আজাদ </span>
              <span className="text-sm font-sans font-medium text-gray-600">বাংলাদেশ</span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative py-2 text-base font-medium transition-colors duration-200 ${
                    isActive ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-800'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.name}
                    {/* Active Indicator Underline */}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-red-600 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Icons & Search */}
          <div className="flex items-center space-x-4">
            {/* Expandable Search Input */}
            <div className="relative flex items-center">
              {isSearchOpen && (
                <form onSubmit={(event) => { event.preventDefault(); navigate(`/all-news?search=${encodeURIComponent(searchQuery)}`); }}>
                  <input
                    type="text"
                    placeholder="খবর খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 sm:w-60 px-3 py-1 mr-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-600 bg-white"
                    autoFocus
                    aria-label="খবর খুঁজুন"
                  />
                </form>
              )}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="p-2 text-gray-700 hover:text-black focus:outline-none"
                aria-label="খবর খুঁজুন"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-black focus:outline-none"
              aria-label={isMenuOpen ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন'}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-t border-gray-200 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* Ticker & Live Clock Bar */}
      <div className="bg-[#F3F0EA] border-t border-gray-300 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch">
          
          {/* Live Badge & Ticker Container */}
          <div className="flex-1 flex items-center overflow-hidden">
            <div className="bg-[#C53929] text-white px-4 py-2 font-bold tracking-wider flex items-center space-x-1 shrink-0 z-10">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse inline-block mr-1"></span>
              <span>সরাসরি</span>
            </div>

            <div className="relative flex overflow-x-hidden w-full py-2">
              {/* Track 1 */}
              <div className="animate-marquee-track1 whitespace-nowrap flex space-x-8">
                <span className="font-medium text-gray-800">
                  বাংলাদেশের ২৩তম রাষ্ট্রপতি নির্বাচিত বদরুল
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">
                  মক্কা প্রতিরক্ষা সহযোগিতা চুক্তিতে আগ্রহ বাংলাদেশের
                </span>
                <span className="text-gray-400">|</span>
              </div>

              {/* Duplicate Track 2 for Infinite Seamless Loop */}
              <div className="absolute top-2 animate-marquee-track2 whitespace-nowrap flex space-x-8">
                <span className="font-medium text-gray-800">
                  বাংলাদেশের ২৩তম রাষ্ট্রপতি নির্বাচিত বদরুল
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600">
                  মক্কা প্রতিরক্ষা সহযোগিতা চুক্তিতে আগ্রহ বাংলাদেশের
                </span>
                <span className="text-gray-400">|</span>
              </div>
            </div>
          </div>

          {/* Date & Dynamic Clock (Hidden on Mobile) */}
          <div className="hidden sm:flex border-l border-gray-300 px-4 py-2 flex-col justify-center items-end shrink-0 font-mono">
            <span className="text-[10px] text-gray-500 font-semibold tracking-wider">
              {formatDate(currentTime)}
            </span>
            <span className="text-sm font-bold text-gray-900 tracking-wider">
              {formatTime(currentTime)}
            </span>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;