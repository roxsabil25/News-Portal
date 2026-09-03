let fetchedOpinions = [];

try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/news`);
  const result = await response.json();

  if (result.success && Array.isArray(result.data)) {
    fetchedOpinions = result.data
      // ১. OPINION টাইপ বা ক্যাটাগরির ডেটা ফিল্টার
      .filter((item) => {
        const type = item.type?.toUpperCase() || '';
        const category = item.category?.toUpperCase() || '';
        return type.includes('OPINION') || category.includes('OPINION');
      })
      // ২. ডাটা ফরম্যাটিং
      .map((item) => ({
        id: item._id || item.id,
        category: item.category || 'OPINION',
        title: item.title || '',
        publishedDate: item.publishedDate || '',
        thumbnail: item.thumbnail || '',
        shortDescription: item.shortDescription || '',
        fullContent: item.fullContent || '',
        author: item.author || 'Opinion Desk',
        createdAt: item.createdAt || null,
      }))
      // ৩. নিউয়েস্ট ফাস্ট (Newest First) সর্টিং
      .sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });

    // createdAt না থাকলে অ্যারে রিভার্স সেফটি
    if (fetchedOpinions.length > 0 && !fetchedOpinions[0].createdAt) {
      fetchedOpinions.reverse();
    }
  }
} catch (error) {
  console.error('Error fetching opinions:', error);
}

export const opinionList = fetchedOpinions;