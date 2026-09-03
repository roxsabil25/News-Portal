let fetchedNews = [];

try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/news`);
  const result = await response.json();

  if (result.success && Array.isArray(result.data)) {
    fetchedNews = result.data
      .map((item) => ({
        id: item._id || item.id,
        category: item.category || 'NEWS',
        title: item.title || '',
        publishedDate: item.publishedDate || '',
        timeAgo: item.timeAgo || item.publishedDate || '',
        thumbnail: item.thumbnail || '',
        shortDescription: item.shortDescription || '',
        fullContent: item.fullContent || '',
        author: item.author || 'Staff Reporter',
        type: item.type?.toUpperCase() || '',
        createdAt: item.createdAt || null,
      }))
      // নিউয়েস্ট ফাস্ট (Newest First) সর্টিং
      .sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });

    if (fetchedNews.length > 0 && !fetchedNews[0].createdAt) {
      fetchedNews.reverse();
    }
  }
} catch (error) {
  console.error('Error fetching news:', error);
}

// ১. সমস্ত সংবাদের তালিকা (Home Page ইত্যাদির জন্য)
export const newsList = fetchedNews;

// ২. শুধুমাত্র 'NEWS' টাইপ বা ক্যাটাগরির সংবাদের তালিকা (/all-news পেজের জন্য)
export const justNewsList = fetchedNews.filter(
  (item) => item.type === 'NEWS' || item.category.toUpperCase() === 'NEWS'
);

// ৩. স্পটলাইট সংবাদের তালিকা
export const spotlightNews = fetchedNews.filter(
  (item) => item.type === 'SPOTLIGHT' || item.category.toUpperCase() === 'SPOTLIGHT'
);