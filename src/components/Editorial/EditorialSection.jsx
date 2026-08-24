import React from 'react';
import { Link } from 'react-router-dom';
import { editorialsList } from '../../data/editorialsData';

const EditorialSection = () => {
  const mainEditorials = editorialsList.filter((item) => item.category === 'EDITORIALS');
  const nutshellMemos = editorialsList.filter((item) => item.category === 'NUTSHELL MEMOS');

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 bg-[#FAF8F5]">
      
      {/* 1. EDITORIALS SECTION */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xs font-bold text-red-700 tracking-widest uppercase">
            EDITORIALS
          </h2>
          <Link to="/editorials" className="text-xs font-bold uppercase tracking-widest text-gray-700 hover:text-red-700 transition-colors">
            See All →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mainEditorials.map((item) => (
            <article key={item.id} className="flex flex-col">
              <Link to={`/news/${item.id}`} className="block overflow-hidden mb-3 group">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <Link to={`/news/${item.id}`} className="group">
                <h3 className="font-serif font-bold text-lg text-gray-900 leading-snug group-hover:underline mb-2">
                  {item.title}
                </h3>
              </Link>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide font-mono mt-auto">
                {item.publishedDate}
              </span>
            </article>
          ))}
        </div>
      </div>

      {/* 2. NUTSHELL MEMOS SECTION */}
      <div>
        <h2 className="text-xs font-bold text-red-700 tracking-widest uppercase mb-6">
          NUTSHELL MEMOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {nutshellMemos.map((item) => (
            <article key={item.id} className="flex flex-col">
              <Link to={`/news/${item.id}`} className="block overflow-hidden mb-3 group">
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </Link>
              <Link to={`/news/${item.id}`} className="group">
                <h3 className="font-serif font-bold text-lg text-gray-900 leading-snug group-hover:underline mb-2">
                  {item.title}
                </h3>
              </Link>
              <span className="text-[10px] text-gray-400 uppercase tracking-wide font-mono mt-auto">
                {item.publishedDate}
              </span>
            </article>
          ))}
        </div>
      </div>

    </section>
  );
};

export default EditorialSection;
