import parse from 'html-react-parser';
import DOMPurify from 'dompurify';

const NewsContent = ({ fullContent }) => {
  if (!fullContent) return null;

  // HTML Clean/Sanitize করা
  const cleanHtml = DOMPurify.sanitize(fullContent);

  // Safe HTML কে React Element এ কনভার্ট করে রেন্ডার করা
  return (
    <div className="prose max-w-none text-slate-800">
      {parse(cleanHtml)}
    </div>
  );
};

export default NewsContent;