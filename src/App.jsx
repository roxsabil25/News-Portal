
import { Routes, Route } from "react-router-dom";
import Header from "./components/header/header.jsx";
import Home from "./components/home/home.jsx";
import NewsDetails from "./NewsDetails.jsx";
import AllArticles from "./components/articles/AllArticles.jsx";
import AllIcymi from "./components/icymi/AllIcymi.jsx";
import AllOpinions from "./components/opinion/AllOpinions.jsx";
import Editorials from "./components/Editorial/EditorialSection.jsx";
import AllFeatures from "./components/Feature/AllFeatures.jsx";
import AllNews from "./components/news/AllNews.jsx";


const AboutUs = () => <div className="p-8 text-center text-xl font-bold">About Us Page</div>;

function App() {
  return (
    <div className="min-h-screen bg-[#FAF8F5]">
      <Header />
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
        </Routes>
      </main>
    </div>
  );
}

export default App;