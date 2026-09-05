import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from './models/adminModel.js';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET is required in the backend environment');
}

import connectDB from './db/db.js';

import News from './models/newsModel.js';

const app = express();
const port = process.env.PORT || 3000;

const seedAdmin = async () => {
  const existingAdmin = await Admin.findOne({ username: 'rox' });
  if (!existingAdmin) {
    await Admin.create({ username: 'rox', password: 'roX@' });
    console.log('Admin account seeded');
  }
};

connectDB().then(seedAdmin).catch((error) => {
  console.error('Database initialization failed:', error.message);
  process.exit(1);
});

app.use(cors());
app.use(express.json());


// 🔒 Authentication Middleware Check
const verifyToken = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');
  if (scheme !== 'Bearer') return res.status(401).json({ success: false, message: 'Bearer token required' });
  if (!token) return res.status(401).json({ success: false, message: 'Unauthorized access!' });

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.admin = verified;
    next();
  } catch (error) {
    res.status(403).json({ success: false, message: 'Invalid or expired token!' });
  }
};

// 🔑 Admin Login API
app.post('/api/admin/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(400).json({ success: false, message: 'Admin not found!' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ success: false, message: 'Wrong password!' });

    const token = jwt.sign({ id: admin._id, username: admin.username }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ success: true, token, message: 'Login successful!' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/news', verifyToken, async (req, res) => {
  try {
    const newsData = { ...req.body };

    // খালি স্ট্রিং রিমুভ করা যাতে Mongoose-এর default value ট্রিগার হতে পারে
    Object.keys(newsData).forEach((key) => {
      if (newsData[key] === '') {
        delete newsData[key];
      }
    });

    const newNews = new News(newsData);
    const savedNews = await newNews.save();

    return res.status(201).json({
      success: true,
      message: 'News published successfully!',
      data: savedNews,
    });
  } catch (error) {
    console.error('Mongoose Error:', error.message);
    return res.status(400).json({
      success: false,
      message: error.message || 'Failed to publish news',
    });
  }
});

// app.get('/api/news', async (req, res) => {
//   try {
//     const news = await News.find().sort({ createdAt: -1 });
//     res.status(200).json({
//       success: true,
//       data: news,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: 'Server error',
//       error: error.message,
//     });
//   }
// });


app.put('/api/news/:id', verifyToken, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid news id' });
    }

    const { _id, createdAt, updatedAt, __v, ...updates } = req.body;
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: true }
    );

    if (!updatedNews) return res.status(404).json({ success: false, message: 'News not found' });
    return res.status(200).json({ success: true, data: updatedNews, message: 'News updated successfully!' });
  } catch (error) {
    return res.status(400).json({ success: false, message: error.message || 'Failed to update news' });
  }
});

app.delete('/api/news/:id', verifyToken, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: 'Invalid news id' });
    }

    const deletedNews = await News.findByIdAndDelete(req.params.id);
    if (!deletedNews) return res.status(404).json({ success: false, message: 'News not found' });
    return res.status(200).json({ success: true, message: 'News deleted successfully!' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || 'Failed to delete news' });
  }
});



// Database এ থাকা সকল unique category রিটার্ন করবে
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await News.distinct('category');
    res.json(categories);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Single news endpoint that handles ALL news as well as category filtering & sorting
app.get('/api/news', async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    
    if (category) {
      query.category = { $regex: new RegExp(`^${category}$`, 'i') };
    }

    // createdAt: -1 দিয়ে নতুন নিউজ আগে এবং পুরোনো নিউজ পরে ফিল্টার করা হলো
    const newsList = await News.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: newsList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
