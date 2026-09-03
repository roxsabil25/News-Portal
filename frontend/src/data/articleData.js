let fetchedArticles = [];

try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/news`);
  const result = await response.json();

  if (result.success && Array.isArray(result.data)) {
    fetchedArticles = result.data
      // ১. শুধুমাত্র ARTICLE ফিল্টার
      .filter(
        (item) =>
          item.type === 'ARTICLE' || item.category?.toUpperCase() === 'ARTICLE'
      )
      // ২. লেটেস্ট পোস্ট (১০, ৯, ৮...) সবার উপরে দেখানোর জন্য সর্টিং
      .sort((a, b) => {
        // যদি DB-তে createdAt থাকে তবে সেটা দিয়ে, না থাকলে _id/id দিয়ে সর্ট করবে
        const dateA = new Date(a.createdAt || a._id || a.id);
        const dateB = new Date(b.createdAt || b._id || b.id);
        return dateB - dateA; // Newest First (Desc order)
      })
      .map((item) => ({
        id: item._id || item.id,
        tag: item.tag || 'ARTICLE',
        category: item.category || 'ARTICLE',
        title: item.title || '',
        publishedDate: item.publishedDate || '',
        shortDescription: item.shortDescription || '',
        fullContent: item.fullContent || '',
        author: item.author || '',
        role: item.role || '',
        readTime: item.readTime || '',
        thumbnail: item.thumbnail || '',
      }));
  }
} catch (error) {
  console.error('Error fetching articles:', error);
}

// ফেইল-সেফ চেক (যেন FeaturedArticle এ undefined এরর না আসে)
export const articlesList =
  fetchedArticles.length > 0
    ? fetchedArticles
    : [
        {
          id: '',
          tag: '',
          category: '',
          title: '',
          publishedDate: '',
          shortDescription: '',
          fullContent: '',
          author: '',
          role: '',
          readTime: '',
          thumbnail: '',
        },
      ];