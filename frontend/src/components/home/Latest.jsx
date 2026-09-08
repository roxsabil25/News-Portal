import { useState } from 'react';
import { Link } from 'react-router-dom';
import { justNewsList, newsList } from '../../data/newsData';

const Home = () => {
  // ট্যাব স্টেট: 'headlines' (আজকের শিরোনাম) অথবা 'articles' (বিশেষ সংবাদ)
  const [activeTab, setActiveTab] = useState('headlines');

  // ১. 'NEWS' টাইপের ডেটা ফিল্টার করা
  const availableNews =
    justNewsList && justNewsList.length > 0
      ? justNewsList
      : (newsList || []).filter(
          (item) =>
            item.type === 'NEWS' ||
            item.category?.toUpperCase() === 'NEWS' ||
            !item.type
        );

  // ২. 'ARTICLE' টাইপের ডেটা ফিল্টার করা (বিশেষ সংবাদের জন্য)
  const availableArticles = (newsList || []).filter(
    (item) =>
      item.type === 'ARTICLE' ||
      item.category?.toUpperCase() === 'ARTICLE' ||
      item.isSpecial
  );

  // ৩. বাঁপাশের Main News-এর জন্য সবচেয়ে নতুন ১টি নিউজ
  const latestNews = availableNews.length > 0 ? availableNews[0] : null;

  // ৪. সাইডবারের জন্য সক্রিয় ট্যাব অনুযায়ী ৩টি ডেটা নেওয়া (slice(0, 3))
  const currentSidebarData =
    activeTab === 'headlines'
      ? availableNews.slice(0, 3)
      : (availableArticles.length > 0 ? availableArticles : availableNews).slice(0, 3);

  // সেফটি চেকিং
  if (!latestNews) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14" data-aos="fade-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Main News (8 Columns) - 1st Latest Item */}
        <div className="lg:col-span-8 border-b lg:border-b-0 lg:border-r border-gray-300 pr-0 lg:pr-8">
          <span className="text-red-700 text-xs font-bold tracking-wider uppercase">
            {latestNews.category}
          </span>
          
          <Link to={`/news/${latestNews.id}`} className="group block mt-3">
            {latestNews.thumbnail && (
              <div className="overflow-hidden mb-4 rounded">
                <img 
                  src={latestNews.thumbnail} 
                  alt={latestNews.title} 
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <span className="text-xs text-red-700 font-semibold uppercase tracking-wide">
              {latestNews.timeAgo || latestNews.publishedDate}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mt-2 mb-3 leading-tight group-hover:underline">
              {latestNews.title}
            </h1>
            <p className="text-gray-600 text-sm leading-relaxed font-sans">
              {latestNews.shortDescription}
            </p>
          </Link>
        </div>

        {/* Right Side: MORE TODAY Sidebar (4 Columns) - Dynamic Tabs */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <div>
            {/* Tab Header with Switch Buttons & Dynamic See All Link */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('headlines')}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors relative pb-1 ${
                    activeTab === 'headlines'
                      ? 'text-red-700 border-b-2 border-red-700'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  আজকের শিরোনাম
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className={`text-xs font-bold uppercase tracking-wider transition-colors relative pb-1 ${
                    activeTab === 'articles'
                      ? 'text-red-700 border-b-2 border-red-700'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  বিশেষ সংবাদ
                </button>
              </div>

              <Link 
                to={activeTab === 'headlines' ? '/all-news' : '/articles'} 
                className="text-xs font-bold uppercase tracking-widest text-red-700 hover:underline"
              >
                সব দেখুন →
              </Link>
            </div>

            {/* Sidebar List (3 Items based on active tab) */}
            <div className="divide-y divide-gray-200">
              {currentSidebarData.map((item) => (
                <div key={item.id} className="py-3 first:pt-0">
                  {item.category && (
                    <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                  )}
                  <Link 
                    to={activeTab === 'headlines' ? `/news/${item.id}` : `/articles/${item.id}`} 
                    className="group block"
                  >
                    <h3 className="font-serif font-bold text-base text-gray-900 leading-snug group-hover:text-red-700 group-hover:underline transition-colors">
                      {item.title}
                    </h3>
                  </Link>
                  {item.thumbnail && (
                    <div className="mt-2 overflow-hidden rounded">
                      <img 
                        src={item.thumbnail} 
                        alt={item.title} 
                        className="w-full h-24 object-cover transition-transform duration-300 hover:scale-105" 
                      />
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide block mt-1.5 font-mono">
                    {item.timeAgo || item.publishedDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Dynamic Bottom Action Button */}
          <div className="pt-2 border-t border-gray-200">
            <Link 
              to={activeTab === 'headlines' ? '/all-news' : '/articles'} 
              className="w-full block text-center py-2.5 px-4 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors rounded"
            >
              {activeTab === 'headlines' ? 'সব খবর দেখুন' : 'সব বিশেষ সংবাদ দেখুন'}
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;