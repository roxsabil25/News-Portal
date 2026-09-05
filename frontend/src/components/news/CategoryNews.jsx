import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const CategoryNews = () => {
  const { categoryName } = useParams();
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/news?category=${encodeURIComponent(categoryName)}`)
      .then((res) => res.json())
      .then((resData) => {
        // backend formatted as { success: true, data: [...] }
        if (resData.success && Array.isArray(resData.data)) {
          setNewsList(resData.data);
        } else {
          setNewsList([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching category news:', err);
        setLoading(false);
      });
  }, [categoryName]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-600 font-sans">
        খবর লোড হচ্ছে...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-sans">
      {/* Category Header */}
      <div className="border-b-2 border-red-600 pb-2 mb-8 flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 uppercase">
          {categoryName}
        </h1>
        <span className="text-sm text-gray-500 font-medium">
          মোট খবর: {newsList.length} টি
        </span>
      </div>

      {/* News Cards Grid */}
      {newsList.length === 0 ? (
        <div className="text-center py-12 text-gray-500 font-medium">
          এই ক্যাটাগরিতে কোনো খবর পাওয়া যায়নি।
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsList.map((news) => (
            <Link
              key={news._id}
              to={`/news/${news._id}`}
              className="group border border-gray-200 rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              {/* Thumbnail */}
              <div className="h-48 w-full bg-gray-100 overflow-hidden relative">
                {news.thumbnail ? (
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                    কোন ছবি নেই
                  </div>
                )}
                {news.tag && (
                  <span className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase">
                    {news.tag}
                  </span>
                )}
              </div>

              {/* Content Box */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-900 group-hover:text-red-600 transition-colors duration-200 line-clamp-2">
                    {news.title}
                  </h2>
                  <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                    {news.shortDescription}
                  </p>
                </div>

                {/* Footer Info */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-mono">
                  <span>{news.author || 'Staff Reporter'}</span>
                  <span>{news.publishedDate}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNews;