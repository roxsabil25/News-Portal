import { Link } from 'react-router-dom';
import { justNewsList, newsList } from '../../data/newsData';

const Home = () => {
  // ১. শুধুমাত্র 'NEWS' টাইপের ডেটা ফিল্টার করে নেওয়া (fallback সহ)
  const availableNews =
    justNewsList && justNewsList.length > 0
      ? justNewsList
      : (newsList || []).filter(
          (item) =>
            item.type === 'NEWS' ||
            item.category?.toUpperCase() === 'NEWS' ||
            !item.type
        );

  // ২. সবচেয়ে নতুন ১টি পোস্ট বাঁপাশের Main News এর জন্য
  const latestNews = availableNews.length > 0 ? availableNews[0] : null;

  // ৩. পরবর্তী ৩টি পোস্ট (ইনডেক্স ১ থেকে ৩) ডানপাশের MORE TODAY এর জন্য
  const sideNews = availableNews.length > 1 ? availableNews.slice(1, 4) : [];

  // সেফটি চেকিং: ডেটা ফেচ না হওয়া পর্যন্ত রেন্ডার আটকে রাখবে
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

        {/* Right Side: MORE TODAY Sidebar (4 Columns) - Next 3 Items */}
        <div className="lg:col-span-4 space-y-6 flex flex-col justify-between">
          <div>
            {/* Header with See All Link */}
            <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
              <h2 className="text-xs font-bold text-gray-700 tracking-wider uppercase">
                আজকের আরও খবর
              </h2>
              <Link 
                to="/all-news" 
                className="text-xs font-bold uppercase tracking-widest text-red-700 hover:underline"
              >
                সব দেখুন →
              </Link>
            </div>

            {/* Sidebar News List */}
            <div className="divide-y divide-gray-200">
              {sideNews.map((news) => (
                <div key={news.id} className="py-4 first:pt-0">
                  <span className="text-[11px] text-gray-400 font-bold uppercase tracking-wider block mb-1">
                    {news.category}
                  </span>
                  <Link to={`/news/${news.id}`} className="group block">
                    <h3 className="font-serif font-bold text-lg text-gray-900 leading-snug group-hover:underline">
                      {news.title}
                    </h3>
                  </Link>
                  {news.thumbnail && (
                    <div className="mt-3 overflow-hidden rounded">
                      <img 
                        src={news.thumbnail} 
                        alt={news.title} 
                        className="w-full h-24 object-cover transition-transform duration-300 hover:scale-105" 
                      />
                    </div>
                  )}
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide block mt-2 font-mono">
                    {news.timeAgo || news.publishedDate}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* More All News Bottom Button */}
          <div className="pt-2 border-t border-gray-200">
            <Link 
              to="/all-news" 
              className="w-full block text-center py-2.5 px-4 bg-gray-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-red-700 transition-colors rounded"
            >
              সব খবর দেখুন
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;