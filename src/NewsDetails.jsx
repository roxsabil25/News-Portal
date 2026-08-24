
import { useParams, Link } from 'react-router-dom';
// 1. Correct Import Path & import both lists
import { newsList, spotlightNews } from './data/newsData';
import { articlesList } from './data/articleData';
import { icymiList } from './data/icymiData'; 
import { editorialsList } from './data/editorialsData'; 
import { opinionList } from './data/opinionData';
import { featureList } from './data/featureData';

const NewsDetails = () => {
  const { id } = useParams();
  
  // 2. Combine all news items (newsList + spotlightNews)
  const allNews = [
...(newsList || []), 
...(spotlightNews || []), 
...(articlesList || []),
...(icymiList || []),
...(editorialsList || []),
...(opinionList || []),
...(featureList || [])
];
  
  // Future MongoDB standard: useEffect(() => fetch(`/api/news/${id}`), [id])
  const news = allNews.find((item) => item.id === id);

  if (!news) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center font-sans">
        <h2 className="text-2xl font-bold text-gray-800">News Not Found</h2>
        <Link to="/" className="text-red-600 underline mt-4 inline-block font-semibold">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto px-4 py-10 font-sans">
      <div className="mb-6">
        <span className="text-xs font-bold text-red-700 tracking-widest uppercase">
          {news.category || news.subCategory}
        </span>
        <h1 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 mt-2 mb-4 leading-tight">
          {news.title}
        </h1>
        <div className="flex items-center space-x-4 text-xs text-gray-500 font-medium">
          <span>By {news.author}</span>
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

      <div className="prose max-w-none text-gray-800 text-lg leading-relaxed font-serif whitespace-pre-line">
        {news.fullContent}
      </div>
    </article>
  );
};

export default NewsDetails;