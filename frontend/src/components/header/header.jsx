import { useState, useEffect, useRef } from 'react';
import { Search, Menu, X, Clock, Calendar, ChevronRight, ChevronLeft } from 'lucide-react';
import { NavLink, Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [categories, setCategories] = useState([]);
  const [tickerNews, setTickerNews] = useState([]);
  const navigate = useNavigate();

  // Scroll Reference for Desktop Category Bar
  const categoryContainerRef = useRef(null);

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
          setTickerNews(newsList.slice(0, 10));
        }
      })
      .catch((err) => console.error('Error fetching ticker news:', err));
  }, []);

  // Handle Horizontal Mouse Wheel Scrolling on Desktop Navigation
  const handleWheelScroll = (e) => {
    if (categoryContainerRef.current) {
      e.preventDefault();
      categoryContainerRef.current.scrollLeft += e.deltaY;
    }
  };

  // Button Scroll Helpers
  const scrollCategory = (direction) => {
    if (categoryContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categoryContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/all-news?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // বাংলা সংখ্যায় পরিবর্তনের হেলপার
  const toBanglaDigits = (num) => {
    const banglaNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
    return num.toString().replace(/\d/g, (digit) => banglaNumbers[digit]);
  };

  // ১. বারের নাম (দিন)
  const getDayName = (date) => {
    return date.toLocaleDateString('bn-BD', { weekday: 'long' });
  };

  // ২. ইংরেজি তারিখ (বাংলায়, বার ছাড়া)
  const formatEnglishDate = (date) => {
    return date.toLocaleDateString('bn-BD', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  // ৩. সঠিক বঙ্গাব্দ
  const getBanglaDateAndMonth = (date) => {
    const banglaMonths = [
      'বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্রমাস', 'আশ্বিন',
      'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'
    ];
    
    const day = date.getDate();
    const month = date.getMonth(); 
    const year = date.getFullYear();

    let bYear = year - 593;
    let bMonthIndex = 0;
    let bDate = 1;

    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);

    if (month < 3 || (month === 3 && day < 14)) {
      bYear = year - 594;
    }

    if (month === 3 && day >= 14) {
      bMonthIndex = 0; 
      bDate = day - 13;
    } else if (month === 4) {
      if (day <= 14) { bMonthIndex = 0; bDate = day + 17; }
      else { bMonthIndex = 1; bDate = day - 14; }
    } else if (month === 5) {
      if (day <= 14) { bMonthIndex = 1; bDate = day + 17; }
      else { bMonthIndex = 2; bDate = day - 14; }
    } else if (month === 6) {
      if (day <= 15) { bMonthIndex = 2; bDate = day + 16; }
      else { bMonthIndex = 3; bDate = day - 15; }
    } else if (month === 7) {
      if (day <= 15) { bMonthIndex = 3; bDate = day + 16; }
      else { bMonthIndex = 4; bDate = day - 15; }
    } else if (month === 8) {
      if (day <= 16) { bMonthIndex = 4; bDate = day + 16; }
      else { bMonthIndex = 5; bDate = day - 16; }
    } else if (month === 9) {
      if (day <= 16) { bMonthIndex = 5; bDate = day + 15; }
      else { bMonthIndex = 6; bDate = day - 16; }
    } else if (month === 10) {
      if (day <= 15) { bMonthIndex = 6; bDate = day + 15; }
      else { bMonthIndex = 7; bDate = day - 15; }
    } else if (month === 11) {
      if (day <= 15) { bMonthIndex = 7; bDate = day + 15; }
      else { bMonthIndex = 8; bDate = day - 15; }
    } else if (month === 0) {
      if (day <= 14) { bMonthIndex = 8; bDate = day + 16; }
      else { bMonthIndex = 9; bDate = day - 14; }
    } else if (month === 1) {
      if (day <= 13) { bMonthIndex = 9; bDate = day + 17; }
      else { bMonthIndex = 10; bDate = day - 13; }
    } else if (month === 2) {
      if (day <= 14) { bMonthIndex = 10; bDate = day + (isLeapYear ? 16 : 15); }
      else { bMonthIndex = 11; bDate = day - 14; }
    } else if (month === 3 && day < 14) {
      bMonthIndex = 11;
      bDate = day + 17;
    }

    return `${toBanglaDigits(bDate)} ${banglaMonths[bMonthIndex]} ${toBanglaDigits(bYear)} বঙ্গাব্দ`;
  };

  // ৪. হিজরি তারিখ
  const formatHijriDate = (date) => {
    try {
      return new Intl.DateTimeFormat('bn-BD-u-ca-islamic-umalqura', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(date) + ' হিজরি';
    } catch {
      return '';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('bn-BD', { hour12: false });
  };

  const primaryNavItems = [
    { name: 'হোম', path: '/' },
    { name: 'কলাম', path: '/feature' },
    { name: 'সম্পাদকীয়', path: '/editorials' },
    { name: 'মতামত', path: '/opinion' },
    { name: 'আজকের ব্লগ', path: '/all-news' },
    
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



      {/* Main Navigation Header */}
      <div className=" mx-auto px-2 sm:px-6 lg:px-6 bg-black text-white">
        <div className="flex items-center justify-between py-2  gap-2">
          
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group shrink-0">
            <div className="w-12 h-16 sm:w-16 sm:h-20 overflow-hidden  shadow-sm group-hover:scale-105 transition-transform duration-200 rounded">
              <img src="/img/Capture-Photoroom.png" alt="আজাদ বাংলাদেশ" className="border-2 border-black  w-full h-full object-cover " />
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-serif font-bold text-white leading-tight">
                আজাদির কথা
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center justify-center">
            <img src="/img/second_logo.png" alt="Advertisement" className="w-[80%] max-w-[728px] h-auto object-contain" />
          </div>

          {/* তারিখ ও সময় সেকশন */}
          <div className="flex flex-col items-end text-[10px] sm:text-xs font-sans text-gray-700 shrink-0 leading-tight space-y-0.5">
            <span className="text-xs sm:text-sm font-bold text-white  pb-0.5 mb-0.5">
              {getDayName(currentTime)}
            </span>
            <span className="flex items-center gap-1 font-semibold text-white">
              <Calendar className="w-3 h-3 text-white shrink-0" />
              {formatEnglishDate(currentTime)}
            </span>
            <span className="text-white font-semibold text-[10px] sm:text-[11px]">
              {getBanglaDateAndMonth(currentTime)}
            </span>
            <span className="text-white text-[10px] sm:text-[11px]">
              {formatHijriDate(currentTime)}
            </span>
            <span className="flex items-center gap-1 text-xs sm:text-xs font-mono font-bold text-white pt-0.5">
              <Clock className="w-3 h-3 text-white shrink-0" />
              {formatTime(currentTime)}
            </span>
          </div>

        </div>
      </div>

            {/* Top Mini Bar */}
      <div className="bg-[#1e293b] text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-slate-700">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-4 text-[11px] text-slate-300">
            <a href="https://www.azadirkotha.com" target="_blank" rel="noreferrer" className="hover:underline">
              www.azadirkotha.com
            </a>
            <span className="hidden sm:inline">|</span>
            <a href="https://www.facebook.com/AzadBangladesh2" target="_blank" rel="noreferrer" className="hidden sm:inline hover:underline">
              facebook.com/AzadBangladesh2
            </a>
            <NavLink to="/admin/login" className="flex items-center space-x-1.5 group">
              <span className="text-[#1e293b]">admin</span>
            </NavLink>
          </div>
          <div className="text-[11px] text-slate-400 font-medium">
            সত্যের সন্ধানে অবিরত
          </div>
        </div>
      </div>

      {/* Dynamic Breaking News Ticker */}
      <div className="bg-[#f8fafc] border-t border-b border-gray-200 text-xs text-gray-700">
        <div className="max-w-7xl mx-auto flex items-center overflow-hidden h-8 sm:h-9">
          <div className="bg-red-600 text-white px-3 py-1.5 font-bold tracking-wider flex items-center shrink-0 z-10 h-full shadow-md text-[11px] sm:text-xs">
            <span className="w-2 h-2 rounded-full bg-white animate-ping inline-block mr-1.5 sm:mr-2"></span>
            <span>সরাসরি</span>
          </div>

          <div className="relative flex overflow-x-hidden w-full items-center pause-hover">
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

      {/* Desktop Navigation & Horizontal Scrollable Category Bar */}
      <div className="bg-[#FAF8F5] border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between gap-2">
          
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-md bg-white border border-gray-200 text-gray-700 hover:bg-gray-100 focus:outline-none shadow-sm flex items-center gap-1 text-xs font-semibold shrink-0"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-5 h-5 text-red-600" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* Desktop Left Scroll Button */}
          <button
            onClick={() => scrollCategory('left')}
            className="hidden lg:flex items-center justify-center p-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm shrink-0"
            aria-label="Scroll Left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Combined Navigation Container (Scrollable via Mouse Wheel & Buttons) */}
          <nav
            ref={categoryContainerRef}
            onWheel={handleWheelScroll}
            className="hidden lg:flex items-center space-x-1 xl:space-x-2 text-sm font-medium text-gray-700 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full"
          >
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-sm font-semibold transition-all duration-200 whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-red-50 text-red-600 font-bold'
                      : 'text-gray-700 hover:bg-gray-200/60 hover:text-red-600'
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <span className="text-gray-300 px-1 shrink-0">|</span>

            {categories.map((cat) => (
              <NavLink
                key={cat}
                to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium transition-all duration-200 capitalize whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-gray-700 hover:bg-gray-200/60 hover:text-gray-900'
                  }`
                }
              >
                {cat}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Right Scroll Button */}
          <button
            onClick={() => scrollCategory('right')}
            className="hidden lg:flex items-center justify-center p-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm shrink-0"
            aria-label="Scroll Right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Search Toggle / Form */}
          <div className="relative shrink-0 ml-auto lg:ml-0">
            {isSearchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center relative">
                <input
                  type="text"
                  placeholder="খবর খুঁজুন..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-44 sm:w-64 px-3 py-1 pr-7 text-xs sm:text-sm border border-red-500 rounded-full focus:outline-none bg-white shadow-sm"
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

      {/* Mobile Drawer Menu */}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                {categories.map((cat) => (
                  <NavLink
                    key={cat}
                    to={`/category/${encodeURIComponent(cat.toLowerCase())}`}
                    onClick={() => setIsMenuOpen(false)}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-xs font-medium capitalize truncate transition-colors text-center ${
                        isActive ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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