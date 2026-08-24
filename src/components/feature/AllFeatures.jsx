import React from 'react';
import { Link } from 'react-router-dom';
import { featureList } from '../../data/featureData';

const AllFeatures = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#FAF8F5]">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8 border-b border-gray-300 pb-4">
        All Feature Stories
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {featureList.map((item) => (
          <div key={item.id} className="border border-gray-200 bg-white p-4 rounded flex flex-col justify-between">
            <div>
              <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-cover mb-3 rounded" />
              <span className="text-[11px] font-bold text-red-700 tracking-wider uppercase block mb-1">
                {item.category}
              </span>
              <Link to={`/news/${item.id}`} className="group">
                <h3 className="font-serif font-bold text-lg text-gray-900 leading-snug group-hover:underline mb-2">
                  {item.title}
                </h3>
              </Link>
              <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                {item.shortDescription}
              </p>
            </div>
            <span className="text-[10px] text-gray-400 uppercase tracking-wide font-mono border-t pt-2 block">
              {item.publishedDate}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFeatures;