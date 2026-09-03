import { useEffect } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import Header from "./components/header/header.jsx";
import Home from "./components/home/home.jsx";
import NewsDetails from "./NewsDetails.jsx";
import AllArticles from "./components/articles/AllArticles.jsx";
import AllIcymi from "./components/icymi/AllIcymi.jsx";
import AllOpinions from "./components/opinion/AllOpinions.jsx";
import Editorials from "./components/editorial/EditorialSection.jsx";
import AllFeatures from "./components/feature/AllFeatures.jsx";
import AllNews from "./components/news/AllNews.jsx";

import AdminLogin from "./adminPanel/Login.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

// Admin Panel Import
import AdminHome from "./adminPanel/home.jsx";

// Scroll to top helper component
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AboutUs = () => (
  <div className="public-page max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
    <p className="text-sm font-semibold text-[#d4482f] mb-3">আজাদ বাংলাদেশ</p>
    <h1 className="font-serif text-4xl font-bold text-[#17211b]">আমাদের কথা</h1>
    <p className="max-w-xl mx-auto mt-5 text-[#667168] text-lg">সত্য, প্রাসঙ্গিকতা ও মানুষের গল্পকে পাঠকের কাছে পৌঁছে দেওয়াই আমাদের অঙ্গীকার।</p>
  </div>
);

const Footer = () => (
  <footer className="public-footer mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between">
      <div><p className="font-serif text-2xl font-bold">আজাদ বাংলাদেশ</p><p className="text-sm text-[#aeb9ae] mt-1">খবরে থাকুন, সত্যের পাশে থাকুন।</p></div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm"><Link to="/all-news">সর্বশেষ খবর</Link><Link to="/about-us">আমাদের কথা</Link><span className="text-[#7e8b80]">© {new Date().getFullYear()} আজাদ বাংলাদেশ</span></div>
    </div>
  </footer>
);

function App() {
  const location = useLocation();

  // AOS Animation Initialization & Refresh on Route Change
  useEffect(() => {
    AOS.init({
      duration: 800, // অ্যানিমেশনের সময় (milliseconds)
      once: true,    // স্ক্রোল করার সময় অ্যানিমেশন একবারই হবে
      easing: "ease-in-out",
    });
  }, []);

  useEffect(() => {
    AOS.refresh(); // পেজ বা রাউট চেঞ্জ হলে AOS আপডেট হবে
  }, [location.pathname]);

  // অ্যাডমিন পেজে থাকলে পাবলিক Header হাইড করার জন্য Check
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <ScrollToTop />
      {!isAdminRoute && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/news/:id" element={<NewsDetails />} />
          <Route path="/articles" element={<AllArticles />} />
          <Route path="/icymi" element={<AllIcymi />} />
          <Route path="/editorials" element={<Editorials />} />
          <Route path="/opinion" element={<AllOpinions />} />
          <Route path="/all-news" element={<AllNews />} />
          <Route path="/feature" element={<AllFeatures />} />
          <Route path="/about-us" element={<AboutUs />} />
          {/* Admin Login Route */}
          <Route path="/admin/login" element={<AdminLogin />} />
          {/* Admin Panel Route */}
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminHome />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;