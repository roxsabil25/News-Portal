import { useParams, Link } from 'react-router-dom';
// NewsContent কম্পোনেন্টটি ইমপোর্ট করা হলো
import NewsContent from './components/NewsContent'; 

// Data imports
import { newsList, spotlightNews } from './data/newsData';
import { articlesList } from './data/articleData';
import { icymiList } from './data/icymiData'; 
import { editorialsList } from './data/editorialsData'; 
import { opinionList } from './data/opinionData';
import { featureList } from './data/featureData';

const NewsDetails = () => {
  const { id } = useParams();
  
  // Combine all news items
  const allNews = [
    ...(newsList || []), 
    ...(spotlightNews || []), 
    ...(articlesList || []),
    ...(icymiList || []),
    ...(editorialsList || []),
    ...(opinionList || []),
    ...(featureList || [])
  ];
  
  // Local static data id or MongoDB _id check
  const news = allNews.find((item) => item._id === id || item.id === id);

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800">খবরটি পাওয়া যায়নি</h2>
        <Link to="/" className="text-red-600 underline mt-4 inline-block font-semibold">
          প্রচ্ছদে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <article className="public-page max-w-4xl mx-auto px-4 py-10 font-sans" data-aos="fade-up">
      <div className="mb-6">
        <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
          {news.category || news.subCategory}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 mt-2 mb-4 leading-tight">
          {news.title}
        </h1>
        <div className="flex items-center space-x-4 text-xs text-gray-500 font-medium">
          <span>লেখক: {news.author}</span>
          <span>•</span>
          <span>{news.publishedDate}</span>
        </div>
      </div>

      {news.thumbnail && (
        <img 
          src={news.thumbnail} 
          alt={news.title} 
          className="w-full h-auto mb-8 object-cover rounded" 
        />
      )}

      {/* HTML Tag সরাতে NewsContent কম্পোনেন্ট রেন্ডার করা হয়েছে */}
      <NewsContent fullContent={news.fullContent} />
    </article>
  );
};

export default NewsDetails;