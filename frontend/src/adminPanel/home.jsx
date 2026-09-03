import { useState, useRef } from 'react';
import Sidebar from './sideBar';
import NewsManager from './NewsManager';
import { Menu } from 'lucide-react';

const Home = () => {
  const [activeTab, setActiveTab] = useState('add-news');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const editorRef = useRef(null);

  const initialFormState = {
    type: 'NEWS',
    category: '',
    subCategory: '',
    tag: '',
    title: '',
    shortDescription: '',
    fullContent: '',
    thumbnail: '',
    author: '',
    role: '',
    readTime: '',
    publishedDate: new Date().toISOString().split('T')[0],
    timeAgo: '',
    isFeatured: false,
    isSpotlight: false,
    isIcymi: false,
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Robust formatting command executor
  const executeCommand = (command, value = null) => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
    
    if (command === 'formatBlock') {
      document.execCommand('formatBlock', false, value);
    } else {
      document.execCommand(command, false, value);
    }
    
    updateContentState();
  };

  // Alignment Handler
  const setAlignment = (align) => {
    if (!editorRef.current) return;
    editorRef.current.focus();
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let node = selection.anchorNode;
    while (node && node !== editorRef.current && !['P', 'H1', 'H2', 'H3', 'H4', 'DIV', 'LI'].includes(node.nodeName)) {
      node = node.parentNode;
    }

    if (node && node !== editorRef.current) {
      node.style.textAlign = align;
    } else {
      document.execCommand('justify' + align.charAt(0).toUpperCase() + align.slice(1), false, null);
    }
    updateContentState();
  };

  const updateContentState = () => {
    if (editorRef.current) {
      setFormData((prev) => ({
        ...prev,
        fullContent: editorRef.current.innerHTML,
      }));
    }
  };

  const addLink = () => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  };

  const addImage = () => {
    const url = prompt('Enter Image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setMessage({ type: 'success', text: 'News post published successfully!' });
        setFormData(initialFormState);
        if (editorRef.current) editorRef.current.innerHTML = '';
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to publish news post.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Server connection failed!' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-100 min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
        <button type="button" onClick={() => setIsSidebarOpen(true)} aria-label="Open admin menu" className="md:hidden mb-4 inline-flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-sm font-semibold text-white"><Menu size={18} /> Menu</button>
        {activeTab === 'add-news' ? (
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-4 sm:p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-3">Create News Post</h2>

            {message.text && (
              <div
                className={`p-4 rounded-lg mb-6 text-sm font-medium ${
                  message.type === 'success'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Type, Category & SubCategory */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Post Type</label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="NEWS">NEWS</option>
                    <option value="ARTICLE">ARTICLE</option>
                    <option value="EDITORIAL">EDITORIAL</option>
                    <option value="FEATURE">FEATURE</option>
                    <option value="ICYMI">ICYMI</option>
                    <option value="SPOTLIGHT">SPOTLIGHT</option>
                    <option value="OPINION">OPINION</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Category *</label>
                  <input
                    type="text"
                    name="category"
                    placeholder="e.g. FEATURE, NATIONAL"
                    value={formData.category}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Sub Category</label>
                  <input
                    type="text"
                    name="subCategory"
                    placeholder="e.g. WORLD"
                    value={formData.subCategory}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Title & Tag */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Title *</label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter news title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Tag</label>
                  <input
                    type="text"
                    name="tag"
                    placeholder="e.g. FEATURED ARTICLE"
                    value={formData.tag}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Short Description */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Short Description *</label>
                <textarea
                  name="shortDescription"
                  rows="2"
                  placeholder="Summary of the news..."
                  value={formData.shortDescription}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                ></textarea>
              </div>

              {/* Advanced Custom Rich Text Editor */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Full Content *</label>
                <div className="border border-slate-300 rounded-lg overflow-hidden bg-white">
                  {/* Toolbar */}
                  <div className="flex flex-wrap gap-1 p-2 bg-slate-50 border-b border-slate-200 text-sm font-medium">
                    <button type="button" onClick={() => executeCommand('bold')} className="px-2.5 py-1 border rounded hover:bg-slate-200 font-bold" title="Bold">B</button>
                    <button type="button" onClick={() => executeCommand('italic')} className="px-2.5 py-1 border rounded hover:bg-slate-200 italic" title="Italic">I</button>
                    <button type="button" onClick={() => executeCommand('underline')} className="px-2.5 py-1 border rounded hover:bg-slate-200 underline" title="Underline">U</button>
                    <button type="button" onClick={() => executeCommand('strikeThrough')} className="px-2.5 py-1 border rounded hover:bg-slate-200 line-through" title="Strikethrough">S</button>
                    
                    <div className="h-6 w-[1px] bg-slate-300 mx-1"></div>

                    <button type="button" onClick={() => executeCommand('formatBlock', 'H2')} className="px-2.5 py-1 border rounded hover:bg-slate-200 font-semibold" title="Heading 2">H2</button>
                    <button type="button" onClick={() => executeCommand('formatBlock', 'H3')} className="px-2.5 py-1 border rounded hover:bg-slate-200 font-semibold" title="Heading 3">H3</button>
                    <button type="button" onClick={() => executeCommand('formatBlock', 'P')} className="px-2.5 py-1 border rounded hover:bg-slate-200" title="Paragraph">P</button>

                    <div className="h-6 w-[1px] bg-slate-300 mx-1"></div>

                    <button type="button" onClick={() => executeCommand('insertUnorderedList')} className="px-2.5 py-1 border rounded hover:bg-slate-200" title="Bullet List">• List</button>
                    <button type="button" onClick={() => executeCommand('insertOrderedList')} className="px-2.5 py-1 border rounded hover:bg-slate-200" title="Numbered List">1. List</button>

                    <div className="h-6 w-[1px] bg-slate-300 mx-1"></div>

                    <button type="button" onClick={() => setAlignment('left')} className="px-2.5 py-1 border rounded hover:bg-slate-200" title="Align Left">Left</button>
                    <button type="button" onClick={() => setAlignment('center')} className="px-2.5 py-1 border rounded hover:bg-slate-200" title="Align Center">Center</button>
                    <button type="button" onClick={() => setAlignment('right')} className="px-2.5 py-1 border rounded hover:bg-slate-200" title="Align Right">Right</button>

                    <div className="h-6 w-[1px] bg-slate-300 mx-1"></div>

                    <button type="button" onClick={addLink} className="px-2.5 py-1 border rounded hover:bg-slate-200 text-blue-600" title="Add Link">Link</button>
                    <button type="button" onClick={addImage} className="px-2.5 py-1 border rounded hover:bg-slate-200" title="Add Image">Image</button>
                    <button type="button" onClick={() => executeCommand('removeFormat')} className="px-2.5 py-1 border rounded hover:bg-slate-200 text-rose-600" title="Clear Formatting">Clear</button>
                  </div>

                  {/* Styled Editable Area */}
                  <div
                    ref={editorRef}
                    contentEditable
                    onInput={updateContentState}
                    onBlur={updateContentState}
                    onKeyUp={updateContentState}
                    className="min-h-[300px] p-4 focus:outline-none text-slate-800 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:my-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:my-2 [&_p]:my-1 [&_a]:text-blue-600 [&_a]:underline"
                    style={{ minHeight: '300px' }}
                  ></div>
                </div>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Thumbnail Image URL</label>
                <input
                  type="url"
                  name="thumbnail"
                  placeholder="https://example.com/image.jpg"
                  value={formData.thumbnail}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              {/* Author Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Author</label>
                  <input
                    type="text"
                    name="author"
                    placeholder="e.g. NAYEM ALI"
                    value={formData.author}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Author Role</label>
                  <input
                    type="text"
                    name="role"
                    placeholder="e.g. HEAD OF CONTENT"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Read Time</label>
                  <input
                    type="text"
                    name="readTime"
                    placeholder="e.g. 5 min"
                    value={formData.readTime}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Publish Date *</label>
                  <input
                    type="text"
                    name="publishedDate"
                    placeholder="e.g. 24 AUGUST 2026"
                    value={formData.publishedDate}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">Time Ago Label</label>
                  <input
                    type="text"
                    name="timeAgo"
                    placeholder="e.g. 20 MINUTES AGO"
                    value={formData.timeAgo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex flex-wrap gap-6 pt-2 border-t">
                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium text-sm">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleChange}
                    className="w-4 h-4 accent-emerald-600 rounded"
                  />
                  Featured Post
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium text-sm">
                  <input
                    type="checkbox"
                    name="isSpotlight"
                    checked={formData.isSpotlight}
                    onChange={handleChange}
                    className="w-4 h-4 accent-emerald-600 rounded"
                  />
                  Spotlight Post
                </label>

                <label className="flex items-center gap-2 cursor-pointer text-slate-700 font-medium text-sm">
                  <input
                    type="checkbox"
                    name="isIcymi"
                    checked={formData.isIcymi}
                    onChange={handleChange}
                    className="w-4 h-4 accent-emerald-600 rounded"
                  />
                  ICYMI Post
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-md disabled:bg-slate-400"
              >
                {loading ? 'Publishing Post...' : 'Publish Post'}
              </button>
            </form>
          </div>
        ) : activeTab === 'all-news' ? (
          <NewsManager />
        ) : (
          <div className="bg-white p-8 rounded-xl shadow-sm border text-slate-600">
            <h2 className="text-xl font-bold mb-4">{activeTab.toUpperCase()} Section</h2>
            <p>This section is under construction.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;