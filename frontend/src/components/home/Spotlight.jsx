
import { Link } from 'react-router-dom';
import { spotlightNews } from '../../data/newsData';

const Spotlight = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-aos="fade-up">
      {/* Header with Top & Bottom Border */}
      <div className="border-t border-b border-gray-300 py-2 mb-6 flex items-center">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest mr-4">
          আলোচিত
        </h2>
        <div className="flex-1 h-[1px] bg-gray-300"></div>
      </div>

      {/* 3 Column Grid with Vertical Borders */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-300">
        {spotlightNews.map((item, index) => (
          <article 
            key={item.id} 
            className={`flex flex-col justify-between ${
              index === 0 ? 'md:pr-6' : index === 1 ? 'md:px-6 pt-6 md:pt-0' : 'md:pl-6 pt-6 md:pt-0'
            }`}
          >
            <div>
              {/* Image */}
              <Link to={`/news/${item.id}`} className="block overflow-hidden mb-3 group">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Sub-Category */}
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                {item.subCategory}
              </span>

              {/* News Title */}
              <Link to={`/news/${item.id}`} className="group">
                <h3 className="font-serif font-bold text-lg text-gray-900 leading-snug group-hover:underline">
                  {item.title}
                </h3>
              </Link>
            </div>

            {/* Date */}
            <span className="text-[10px] text-gray-400 uppercase tracking-wide block mt-4 font-mono">
              {item.publishedDate}
            </span>
          </article>
        ))}
      </div>

      {/* Bottom Border Line */}
      <div className="border-b border-gray-300 mt-8"></div>
    </section>
  );
};

export default Spotlight;