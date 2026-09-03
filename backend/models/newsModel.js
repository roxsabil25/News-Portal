
import mongoose from 'mongoose';

const newsSchema = new mongoose.Schema(
  {
    // ১. নিউজ বা আর্টিকেলের মূল ধরন
    type: {
      type: String,
      required: true,
      enum: ['ARTICLE', 'EDITORIAL', 'FEATURE', 'ICYMI', 'NEWS', 'SPOTLIGHT', 'OPINION'],
      default: 'NEWS',
    },

    // ২. ক্যাটাগরি ও সাব-ক্যাটাগরি
    category: {
      type: String,
      required: true, // e.g., "FEATURE", "EDITORIALS", "OPINION", "NATIONAL", "WORLD", "LATEST"
      uppercase: true,
      trim: true,
    },
    subCategory: {
      type: String, // e.g., "NATIONAL", "WORLD" (Spotlight-এর ক্ষেত্রে ব্যবহৃত)
      uppercase: true,
      trim: true,
    },
    tag: {
      type: String, // e.g., "FEATURED ARTICLE", "ARTICLE"
      uppercase: true,
      trim: true,
    },

    // ৩. বিষয়বস্তু (Content)
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    shortDescription: {
      type: String,
      required: true,
      trim: true,
    },
    fullContent: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, // Image URL
      default: '',
    },

    // ৪. লেখক ও সময় সম্পর্কিত ফিল্ড
    author: {
      type: String,
      default: 'Staff Reporter',
    },
    role: {
      type: String, // e.g., "HEAD OF CONTENT", "SENIOR ANALYST"
      default: '',
    },
    readTime: {
      type: String, // e.g., "7 min", "5 min"
      default: '',
    },
    publishedDate: {
      type: String, // e.g., "24 AUGUST 2026"
      required: true,
    },
    timeAgo: {
      type: String, // e.g., "20 MINUTES AGO", "3 HOURS AGO"
      default: '',
    },

    // ৫. ফ্ল্যাগ (Filtering & Placement-এর জন্য)
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isSpotlight: {
      type: Boolean,
      default: false,
    },
    isIcymi: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true, // Auto adds createdAt and updatedAt fields
  }
);

// Search Query ফাস্ট করার জন্য Indexing
newsSchema.index({ category: 1, type: 1 });

const News = mongoose.models.News || mongoose.model('News', newsSchema);

export default News;