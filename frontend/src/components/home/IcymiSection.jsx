
import { Link } from 'react-router-dom';
import { icymiList } from '../../data/icymiData';

const IcymiSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10" data-aos="fade-up">
      {/* Header Bar */}
      <div className="border-t border-b border-gray-300 py-2 mb-8 flex items-center justify-between">
        <h2 className="text-xs font-bold text-gray-900 uppercase tracking-widest">
          চোখ এড়িয়ে যাওয়া খবর
        </h2>
        <Link 
          to="/icymi" 
          className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-red-700 transition-colors"
        >
          সব দেখুন →
        </Link>
      </div>

      {/* 2x2 Grid Layout with Borders */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 relative">
        {icymiList.slice(0, 4).map((item, index) => (
          <article 
            key={item.id} 
            className={`flex items-start space-x-4 pb-6 ${
              index < 2 ? 'border-b border-gray-200' : ''
            }`}
          >
            {/* Thumbnail */}
            <Link to={`/news/${item.id}`} className="shrink-0 w-36 h-24 sm:w-44 sm:h-28 overflow-hidden group">
              <img 
                src={item.thumbnail} 
                alt={item.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Content */}
            <div className="flex-1">
              <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider block mb-1">
                {item.category}
              </span>
              <Link to={`/news/${item.id}`} className="group">
                <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 leading-snug group-hover:underline">
                  {item.title}
                </h3>
              </Link>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide block mt-2 font-mono">
                {item.publishedDate}
              </span>
            </div>
          </article>
        ))}

        {/* Center Vertical Border for Large Screens */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-gray-300 pointer-events-none" />
      </div>

      {/* Bottom Border */}
      <div className="border-b border-gray-300 mt-4"></div>
    </section>
  );
};

export default IcymiSection;