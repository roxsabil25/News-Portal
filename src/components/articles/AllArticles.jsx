
import { Link } from 'react-router-dom';
import { articlesList } from '../../data/articleData';

const AllArticles = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#FAF8F5]">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-300 pb-4">
        All Articles & Features
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articlesList.map((article) => (
          <div key={article.id} className="border border-gray-200 bg-white p-5 rounded flex flex-col justify-between">
            <div>
              <img 
                src={article.thumbnail} 
                alt={article.title} 
                className="w-full h-48 object-cover mb-4 rounded" 
              />
              <span className="text-[11px] font-bold text-red-700 tracking-wider uppercase block mb-1">
                {article.category}
              </span>
              <Link to={`/news/${article.id}`} className="group">
                <h3 className="font-serif font-bold text-xl text-gray-900 leading-snug group-hover:underline mb-2">
                  {article.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {article.shortDescription}
              </p>
            </div>

            <div className="border-t border-gray-100 pt-3 flex justify-between items-center text-xs text-gray-400 font-mono">
              <span>{article.author}</span>
              <span>{article.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArticles;