
import { Link } from 'react-router-dom';
import { articlesList } from '../../data/articleData';

const FeaturedArticle = () => {
  const featured = articlesList[0];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#FAF8F5]">
      {/* Featured Card Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-gray-300 pb-10">
        
        {/* Left Column: Content */}
        <div className="lg:col-span-7 pr-0 lg:pr-8 lg:border-r border-gray-300">
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-xs font-bold text-red-700 tracking-wider uppercase">
              {featured.tag}
            </span>
            <span className="text-xs text-gray-400">•</span>
            <span className="text-xs font-medium text-gray-400 tracking-wider uppercase">
              {featured.category}
            </span>
          </div>

          <Link to={`/news/${featured.id}`} className="group">
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight mb-4 group-hover:underline">
              {featured.title}
            </h2>
          </Link>

          <p className="text-xs text-gray-500 font-mono mb-4 uppercase">
            {featured.publishedDate}
          </p>

          <p className="text-gray-600 text-sm sm:text-base leading-relaxed font-sans mb-6">
            {featured.shortDescription}
          </p>

          <div className="flex items-center text-xs font-mono text-gray-500 space-x-2">
            <span className="font-bold text-gray-800">{featured.author}</span>
            <span>•</span>
            <span>{featured.role}</span>
            <span>•</span>
            <span>{featured.readTime}</span>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:col-span-5 flex justify-center">
          <Link to={`/news/${featured.id}`} className="block w-full overflow-hidden group">
            <img 
              src={featured.thumbnail} 
              alt={featured.title} 
              className="w-full h-72 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>
      </div>

      {/* See All Articles Button */}
      <div className="mt-6 text-right">
        <Link 
          to="/articles" 
          className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-800 hover:text-red-700 transition-colors"
        >
          See All Articles →
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticle;