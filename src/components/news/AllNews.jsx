import React from 'react';
import { Link } from 'react-router-dom';
import { newsList, spotlightNews } from '../../data/newsData';

const AllNews = () => {
  const combinedNews = [...(newsList || []), ...(spotlightNews || [])];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#FAF8F5]">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-300 pb-4">
        Today's Latest News
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {combinedNews.map((news) => (
          <div key={news.id} className="border border-gray-200 bg-white p-4 rounded flex flex-col justify-between">
            <div>
              {news.thumbnail && (
                <img src={news.thumbnail} alt={news.title} className="w-full h-48 object-cover mb-3 rounded" />
              )}
              <span className="text-[11px] font-bold text-red-700 tracking-wider uppercase block mb-1">
                {news.category}
              </span>
              <Link to={`/news/${news.id}`} className="group">
                <h3 className="font-serif font-bold text-lg text-gray-900 leading-snug group-hover:underline mb-2">
                  {news.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {news.shortDescription}
              </p>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide font-mono border-t pt-2 block">
              {news.timeAgo || news.publishedDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllNews;