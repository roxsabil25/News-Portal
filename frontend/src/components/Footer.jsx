import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Globe, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-800 font-sans border-t border-gray-200">
      
      {/* 1. Top Section (Logo, Important Links & Address) */}
      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-8">
          
          {/* Logo & Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link to="/" className="flex items-center space-x-3 group mb-2">
              <div className="w-16 h-20  overflow-hidden border border-gray-200 shadow-sm group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="/img/Capture-Photoroom.png" 
                  alt="বাংলাদেশ আজাদ পার্টি" 
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl sm:text-2xl font-serif font-bold text-green-900 leading-tight">
                  বাংলাদেশ আজাদ পার্টি
                </span>
                <span className="text-xs font-semibold tracking-widest text-red-600 uppercase mt-0.5">
                  ৩৬ জুলাই
                </span>
              </div>
            </Link>
            <p className="text-xs text-gray-500 max-w-xs mt-1">
              সত্য ও ইনসাফের পক্ষে সোচ্চার কণ্ঠস্বর
            </p>
          </div>

          {/* Right Content: Important Links & Contact Details */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right space-y-4">
            
            {/* Top Links */}
            {/* <div className="flex flex-wrap justify-center md:justify-end items-center gap-2 sm:gap-4 text-xs sm:text-sm font-semibold text-gray-700">
              <Link to="/fact-check" className="hover:text-red-600 transition-colors">
                তথ্য যাচাই
              </Link>
              <span className="text-red-500">•</span>
              <Link to="/terms" className="hover:text-red-600 transition-colors">
                ব্যবহারের শর্তাবলী
              </Link>
              <span className="text-red-500">•</span>
              <Link to="/privacy-policy" className="hover:text-red-600 transition-colors">
                গোপনীয়তা নীতি
              </Link>
              <span className="text-red-500">•</span>
              <Link to="/disclaimer" className="hover:text-red-600 transition-colors">
                দায়মুক্তি
              </Link>
            </div> */}

            {/* Address & Contact Info */}
            <div className="text-xs sm:text-sm text-gray-600 space-y-1.5 leading-relaxed">
              <p className="flex items-center justify-center md:justify-end gap-1.5">
                <MapPin className="w-4 h-4 text-red-600 shrink-0 hidden sm:inline" />
                <span><strong>বার্তা কক্ষ:</strong> Manama tower, Dhanmondi 13, Dhaka, Bangladesh</span>
              </p>
              <p>
                {/* <strong>স্টুডিও:</strong> ২৪, ড. নবাব আলী টাওয়ার, পুরানা পল্টন, ঢাকা-১০০০ */}
              </p>
              <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 pt-1 text-gray-700 font-mono text-xs">
                <a href="mailto:3szihad@gmail.com" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-red-600" />
                  3szihad@gmail.com
                </a>
                <span className="hidden sm:inline text-gray-300">|</span>
                <a href="tel:01841110033" className="flex items-center gap-1 hover:text-red-600 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  +880 1533-758487
                </a>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 2. Middle Editor & Social Icons Bar */}
      <div className="bg-gray-100 border-t border-gray-200 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-xs sm:text-sm text-gray-800">
          
          {/* Editorial / Leadership Names */}
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 sm:gap-4 font-medium">
            <span>সম্পাদক: <strong className="text-gray-900">মাসুম খান</strong></span>
            <span className="text-gray-400">|</span>
            <span>ব্যবস্থাপনা সম্পাদক: <strong className="text-gray-900">খালিদ সাইফুল্লাহ</strong></span>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-3">
            {/* Facebook */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Facebook"
              className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="font-bold text-sm">f</span>
            </a>
            {/* Instagram */}
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="Instagram"
              className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-500 via-pink-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="font-bold text-xs">IG</span>
            </a>
            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="YouTube"
              className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="font-bold text-xs">YT</span>
            </a>
            {/* X / Twitter */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noreferrer" 
              aria-label="X"
              className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center hover:opacity-90 transition-opacity"
            >
              <span className="font-bold text-xs">X</span>
            </a>
          </div>

        </div>
      </div>

      {/* 3. Bottom Copyright & Developer Credit Bar */}
      <div className="bg-gray-200 text-gray-700 text-xs py-3 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center">
          
          {/* Copyright Text */}
          <div>
            © {new Date().getFullYear()} <span className="font-semibold text-gray-900">বাংলাদেশ আজাদ পার্টি</span> কর্তৃক সর্বস্বত্ব স্বত্বাধিকার সংরক্ষিত।
          </div>

          {/* Developer Credit */}
          <div className="flex items-center gap-1.5 text-gray-600 font-medium">
            <span>Developed by</span>
            <span className="font-bold text-gray-900">Rox Sabil</span>
            <a 
              href="https://wa.me/8801749935208" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-2 py-0.5 rounded-full text-[11px] transition-colors ml-1"
            >
              <MessageCircle className="w-3 h-3" />
              <span>+8801749935208</span>
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
};

export default Footer;