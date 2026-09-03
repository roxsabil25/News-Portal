let fetchedFeatures = [];

try {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/news`);
  const result = await response.json();

  if (result.success && Array.isArray(result.data)) {
    fetchedFeatures = result.data
      // ১. শুধুমাত্র FEATURE ফিল্টার
      .filter((item) => {
        const type = item.type?.toUpperCase() || '';
        const category = item.category?.toUpperCase() || '';
        return type.includes('FEATURE') || category.includes('FEATURE');
      })
      // ২. ডাটা ফরম্যাটিং
      .map((item) => ({
        id: item._id || item.id,
        category: item.category || 'FEATURE',
        title: item.title || '',
        publishedDate: item.publishedDate || '',
        thumbnail: item.thumbnail || '',
        shortDescription: item.shortDescription || '',
        fullContent: item.fullContent || '',
        author: item.author || 'Feature Desk',
        role: item.role || '',
        readTime: item.readTime || '',
        tag: item.tag || 'FEATURE',
        createdAt: item.createdAt || null,
      }))
      // ৩. লেটেস্ট পোস্ট সবার উপরে আনার জন্য সর্টিং (Newest First)
      .sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return timeB - timeA;
      });

    // createdAt না থাকলে অ্যারে রিভার্স করে একদম নতুন পোস্ট উপরে আনা
    if (fetchedFeatures.length > 0 && !fetchedFeatures[0].createdAt) {
      fetchedFeatures.reverse();
    }
  }
} catch (error) {
  console.error('Error fetching features:', error);
}

export const featureList = fetchedFeatures;