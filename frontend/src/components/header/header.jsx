import { useState, useEffect } from 'react';
import { Search, Menu, X, Clock, Calendar, ChevronRight } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Dynamic Categories from DB
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-news?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('bn-BD', {
      weekday: 'short',
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('bn-BD', { hour12: false });
  };

  // Primary Pages
  const primaryNavItems = [
    { name: 'প্রচ্ছদ', path: '/' },
    { name: 'সম্পাদকীয়', path: '/editorials' },
    { name: 'মতামত', path: '/opinion' },
    { name: 'ফিচার', path: '/feature' },
    { name: 'আমাদের কথা', path: '/about-us' },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 font-sans sticky top-0 z-50 shadow-sm">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-100%); }
        }
        @keyframes marquee2 {
          0% { transform: translateX(100%); }
          100% { transform: translateX(0%); }
        }
        .animate-marquee-1 { animation: marquee 30s linear infinite; }
        .animate-marquee-2 { animation: marquee2 30s linear infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. Top Mini Bar (Date & Time) */}
      <div className="bg-[#1e293b] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4 font-mono">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-red-400" />
              {formatDate(currentTime)}
            </span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:flex items-center gap-1 font-bold text-white">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              {formatTime(currentTime)}
            </span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            সত্যের সন্ধানে অবিরত
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Logo + Inline Menu + Search) */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center space-x-3 group shrink-0">
            <div className="w-16 h-20  overflow-hidden border border-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-200">
              <img src="/img/Capture-Photoroom.png" alt="বাংলাদেশ আজাদ পার্টি" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg sm:text-xl font-serif font-bold text-green-900 leading-tight">
                বাংলাদেশ আজাদ পার্টি
              </span>
              <span className="text-[11px] font-semibold text-red-600 tracking-wider">
                ৩৬ জুলাই
              </span>
            </div>
          </Link>

          {/* Desktop Primary Menu (Inline with Logo) */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-red-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Search & Mobile Toggle */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearchSubmit} className="flex items-center">
                  <input
                    type="text"
                    placeholder="খবর খুঁজুন..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-40 sm:w-64 px-4 py-1.5 pr-8 text-sm border border-red-500 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500/20 bg-gray-50"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="absolute right-2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2.5 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search className="w-5 h-5 text-gray-700 hover:text-red-600" />
                </button>
              )}
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2.5 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Category Scrollbar Bar */}
      <div className="border-t border-gray-100 bg-[#FAF8F5] shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-2">
            <span className="text-xs font-bold uppercase text-red-600 bg-red-50 px-2.5 py-1 rounded shrink-0 mr-1">
              ক্যাটাগরি:
            </span>
            {categories.map((cat) => (
              <NavLink
                key={cat}
                to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                className={({ isActive }) =>
                  `px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 capitalize whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-200/70 hover:text-gray-900'
                  }`
                }
              >
                {cat}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* 4. Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Primary Navigation Mobile */}
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 px-2">মূল মেনু</p>
              <div className="space-y-1">
                {primaryNavItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-base font-semibold transition-colors ${
                        isActive ? 'bg-red-50 text-red-600' : 'text-gray-800 hover:bg-gray-50'
                      }`
                    }
                  >
                    <span>{item.name}</span>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </NavLink>
                ))}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Dynamic Category Navigation Mobile */}
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">ক্যাটাগরি সমূহ</p>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium capitalize truncate transition-colors ${
                        isActive ? 'bg-red-600 text-white' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`
                    }
                  >
                    {cat}
                  </NavLink>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 5. Live Breaking News Ticker */}
      <div className="bg-[#f8fafc] border-t border-b border-gray-200 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto flex items-center overflow-hidden h-9">
          <div className="bg-red-600 text-white px-3 py-2 font-bold tracking-wider flex items-center shrink-0 z-10 h-full shadow-md">
            <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block mr-2"></span>
            <span>সরাসরি</span>
          </div>

          <div className="relative flex overflow-x-hidden w-full items-center">
            <div className="animate-marquee-1 whitespace-nowrap flex space-x-8 pl-4">
              <span className="font-medium text-gray-800">
                বাংলাদেশের ২৩তম রাষ্ট্রপতি নির্বাচিত বদরুল
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">
                মাক্কাহ প্রতিরক্ষা সহযোগিতা চুক্তিতে আগ্রহ বাংলাদেশের
              </span>
              <span className="text-gray-300">|</span>
            </div>

            <div className="absolute top-0 animate-marquee-2 whitespace-nowrap flex space-x-8 pl-4">
              <span className="font-medium text-gray-800">
                বাংলাদেশের ২৩তম রাষ্ট্রপতি নির্বাচিত বদরুল
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-600">
                মাক্কাহ প্রতিরক্ষা সহযোগিতা চুক্তিতে আগ্রহ বাংলাদেশের
              </span>
              <span className="text-gray-300">|</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;