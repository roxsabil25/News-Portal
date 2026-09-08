import { useState, useEffect } from 'react';
import { Search, Menu, X, Clock, Calendar, ChevronRight } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [tickerNews, setTickerNews] = useState([]); // Dynamic Breaking News
  const navigate = useNavigate();

  // Real-time Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Categories
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) setCategories(data);
      })
      .catch((err) => console.error('Error fetching categories:', err));
  }, []);

  // Fetch Latest News for Ticker Bar
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/news`)
      .then((res) => res.json())
      .then((response) => {
        const newsList = Array.isArray(response) ? response : response.data;
        if (Array.isArray(newsList)) {
          setTickerNews(newsList.slice(0, 10)); // Top 10 recent news
        }
      })
      .catch((err) => console.error('Error fetching ticker news:', err));
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
        .animate-marquee-1 { animation: marquee 35s linear infinite; }
        .animate-marquee-2 { animation: marquee2 35s linear infinite; }
        .pause-hover:hover .animate-marquee-1,
        .pause-hover:hover .animate-marquee-2 {
          animation-play-state: paused;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* 1. Top Mini Bar */}
      <div className="bg-[#1e293b] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4 text-[11px] text-slate-300">
            <span>www.azadirkotha.com</span>
            <span className="hidden sm:inline">|</span>
            <span className="hidden sm:inline">www.media.com</span>
                                    <NavLink
              to="/admin/login"
              className=" flex items-center space-x-1.5 group"
            >
              <span className="text-[#1e293b] ">admin</span>
              </NavLink>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            সত্যের সন্ধানে অবিরত
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Logo + Title + Date/Time Corner) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-2 sm:py-4 gap-2">
          
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
            <div className="w-10 h-12 sm:w-16 sm:h-20 overflow-hidden border border-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-200 rounded">
              <img src="/img/Capture-Photoroom.png" alt="আজাদ বাংলাদেশ" className="w-full h-full object-cover" />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-serif font-bold text-green-900 leading-tight">
                আজাদির কথা
              </span>
            </div>
          </Link>

<div className="hidden lg:flex items-center justify-center">
  <div className="relative group cursor-default">
    <div className="absolute -inset-1 bg-gradient-to-r from-green-600 via-emerald-500 to-red-500 rounded-lg blur-sm opacity-20 group-hover:opacity-40 transition duration-500"></div>
    <div className="relative flex items-center justify-center bg-gradient-to-r from-emerald-50 via-white to-red-50 px-6 py-2 rounded-2xl shadow-md transform hover:scale-105 transition-all duration-300">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black tracking-wider bg-gradient-to-r from-green-900 via-emerald-800 to-red-700 bg-clip-text text-transparent drop-shadow-md leading-none py-1">
        আজাদির কথা
      </h1>
    </div>
  </div>
</div>

          <div className="flex flex-col items-end text-[11px] sm:text-sm font-mono text-gray-700 shrink-0">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
              {formatDate(currentTime)}
            </span>
            <span className="flex items-center gap-1 text-xs sm:text-sm font-semibold text-gray-800">
              <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-500" />
              {formatTime(currentTime)}
            </span>
          </div>

        </div>
      </div>

      {/* 3. DYNAMIC BREAKING NEWS TICKER */}
      <div className="bg-[#f8fafc] border-t border-b border-gray-200 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto flex items-center overflow-hidden h-8 sm:h-9">
          <div className="bg-red-600 text-white px-3 py-1.5 font-bold tracking-wider flex items-center shrink-0 z-10 h-full shadow-md text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block mr-1.5 sm:mr-2"></span>
            <span>সরাসরি</span>
          </div>

          <div className="relative flex overflow-x-hidden w-full items-center pause-hover">
            {/* Main Animated Track */}
            <div className="animate-marquee-1 whitespace-nowrap flex space-x-6 pl-4 items-center">
              {tickerNews.length > 0 ? (
                tickerNews.map((item) => (
                  <div key={item._id} className="flex items-center space-x-6">
                    <Link
                      to={`/news/${item._id}`}
                      className="font-medium text-gray-800 hover:text-red-600 hover:underline transition-colors"
                    >
                      {item.title}
                    </Link>
                    <span className="text-gray-300">|</span>
                  </div>
                ))
              ) : (
                <span className="font-medium text-gray-500">সর্বশেষ সংবাদ লোড হচ্ছে...</span>
              )}
            </div>

            {/* Seamless Duplicate Track */}
            <div className="absolute top-0 animate-marquee-2 whitespace-nowrap flex space-x-6 pl-4 items-center">
              {tickerNews.length > 0 &&
                tickerNews.map((item) => (
                  <div key={`dup-${item._id}`} className="flex items-center space-x-6">
                    <Link
                      to={`/news/${item._id}`}
                      className="font-medium text-gray-800 hover:text-red-600 hover:underline transition-colors"
                    >
                      {item.title}
                    </Link>
                    <span className="text-gray-300">|</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Menu & Search Bar (Centered Navigation for Desktop) */}
      <div className="bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 relative flex items-center justify-between lg:justify-center">
          
          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 focus:outline-none shadow-sm flex items-center gap-1 text-xs font-semibold"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Centered Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-2 xl:space-x-4 text-sm font-medium text-gray-700">
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-4 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-200/60 hover:text-red-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Search Icon / Form - Fixed to the Right */}
          <div className="lg:absolute lg:right-4 xl:right-8 z-10">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  placeholder="খবর খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 sm:w-64 px-3 py-1 pr-7 text-xs sm:text-sm border border-red-500 rounded-full focus:outline-none bg-white shadow-sm"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 text-gray-400 hover:text-gray-600 p-0.5"
                >
                  <X className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 rounded-full bg-white border border-gray-200 text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                aria-label="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            )}
          </div>

        </div>
      </div>

      {/* 5. Dynamic Category Bar */}
      <div className="bg-white border-b border-gray-100 shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 overflow-x-auto no-scrollbar py-1.5">
            <span className="text-[11px] font-bold uppercase text-red-600 bg-red-50 px-2 py-0.5 rounded shrink-0 mr-1">
              ক্যাটাগরি:
            </span>
            {categories.map((cat) => (
              <NavLink
                key={cat}
                to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                className={({ isActive }) =>
                  `px-2.5 py-0.5 text-xs sm:text-sm font-medium rounded transition-all duration-200 capitalize whitespace-nowrap ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                {cat}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>

      {/* 6. Mobile Drawer Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-xl">
          <div className="px-4 pt-3 pb-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div>
              <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 px-2">মূল মেনু</p>
              <div className="space-y-1">
                {primaryNavItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
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

            <div>
              <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">ক্যাটাগরি সমূহ</p>
              <div className="grid grid-cols-2 gap-1.5">
                {categories.map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-xs font-medium capitalize truncate transition-colors ${
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

    </header>
  );
};

export default Header;