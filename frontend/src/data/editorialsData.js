let fetchedEditorials = [];

try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/news`);
  const result = await response.json();

  if (result.success && Array.isArray(result.data)) {
    fetchedEditorials = result.data
      // ১. EDITORIALS এবং NUTSHELL MEMOS উভয় টাইপ/ক্যাটাগরি অ্যালাউ করা
      .filter((item) => {
        const type = item.type?.toUpperCase() || '';
        const category = item.category?.toUpperCase() || '';
        return (
          type.includes('EDITORIAL') ||
          category.includes('EDITORIAL') ||
          type.includes('NUTSHELL') ||
          category.includes('NUTSHELL') ||
          type.includes('MEMO') ||
          category.includes('MEMO')
        );
      })
      // ২. সঠিক ডাটা স্ট্রাকচার ও ক্যাটাগরি কেস ফরম্যাটিং
      .map((item) => {
        const rawCategory = (item.category || item.type || '').toUpperCase();
        let formattedCategory = 'EDITORIALS';

        if (rawCategory.includes('NUTSHELL') || rawCategory.includes('MEMO')) {
          formattedCategory = 'NUTSHELL MEMOS';
        }

        return {
          id: item._id || item.id,
          category: formattedCategory,
          title: item.title || '',
          publishedDate: item.publishedDate || '',
          thumbnail: item.thumbnail || '',
          shortDescription: item.shortDescription || '',
          fullContent: item.fullContent || '',
          author: item.author || 'Editorial Board',
          createdAt: item.createdAt || null,
        };
      })
      // ৩. নিউয়েস্ট ফাস্ট (Newest First) সর্টিং
      .sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });

    // createdAt না থাকলে অ্যারে রিভার্স সেফটি
    if (fetchedEditorials.length > 0 && !fetchedEditorials[0].createdAt) {
      fetchedEditorials.reverse();
    }
  }
} catch (error) {
  console.error('Error fetching editorials:', error);
}

export const editorialsList = fetchedEditorials;