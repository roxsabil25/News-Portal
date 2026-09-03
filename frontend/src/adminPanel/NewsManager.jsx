import { useEffect, useState } from 'react';
import { Pencil, Trash2, X, RefreshCw } from 'lucide-react';

const API_URL = `${import.meta.env.VITE_BACKEND_URL}/api/news`;

const editableFields = [
  ['title', 'Title'],
  ['category', 'Category'],
  ['type', 'Post Type'],
  ['shortDescription', 'Short Description'],
  ['thumbnail', 'Thumbnail URL'],
  ['author', 'Author'],
  ['publishedDate', 'Publish Date'],
];

const NewsManager = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [editing, setEditing] = useState(null);

  const authHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
  });

  const loadNews = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Failed to load news');
      setNews(result.data || []);
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Server connection failed!' });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(() => { loadNews(); }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  const updateEditing = (event) => {
    const { name, value } = event.target;
    setEditing((current) => ({ ...current, [name]: value }));
  };

  const saveEdit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const response = await fetch(`${API_URL}/${editing._id}`, {
        method: 'PUT', headers: authHeaders(), body: JSON.stringify(editing),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Update failed');
      setNews((current) => current.map((item) => item._id === editing._id ? result.data : item));
      setEditing(null);
      setMessage({ type: 'success', text: 'News updated successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Update failed.' });
    } finally {
      setSaving(false);
    }
  };

  const deleteNews = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    try {
      const response = await fetch(`${API_URL}/${item._id}`, { method: 'DELETE', headers: authHeaders() });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message || 'Delete failed');
      setNews((current) => current.filter((entry) => entry._id !== item._id));
      setMessage({ type: 'success', text: 'News deleted successfully.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message || 'Delete failed.' });
    }
  };

  return (
    <section className="max-w-6xl mx-auto space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div><p className="text-sm font-semibold text-emerald-600">Content library</p><h2 className="text-2xl font-bold text-slate-800">All News List</h2></div>
        <button type="button" onClick={loadNews} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm font-semibold text-slate-700 hover:bg-slate-50" disabled={loading}><RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh</button>
      </div>
      {message.text && <div className={`p-3 rounded-lg text-sm ${message.type === 'success' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'}`}>{message.text}</div>}
      {loading ? <p className="py-12 text-center text-slate-500">Loading news...</p> : news.length === 0 ? <p className="py-12 text-center text-slate-500 bg-white rounded-xl border">No news posts found.</p> : (
        <div className="space-y-3">
          {news.map((item) => (
            <article key={item._id} className="bg-white border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row gap-4 sm:items-center shadow-sm">
              {item.thumbnail ? <img src={item.thumbnail} alt="" className="w-full sm:w-28 h-32 sm:h-20 rounded-lg object-cover bg-slate-100" /> : <div className="w-full sm:w-28 h-32 sm:h-20 rounded-lg bg-slate-100" />}
              <div className="min-w-0 flex-1"><div className="flex flex-wrap gap-2 text-xs font-semibold text-emerald-700"><span>{item.type}</span><span className="text-slate-400">{item.category}</span></div><h3 className="font-bold text-slate-800 truncate mt-1">{item.title}</h3><p className="text-sm text-slate-500 mt-1 line-clamp-2">{item.shortDescription}</p><p className="text-xs text-slate-400 mt-2">{item.publishedDate} {item.author && `· ${item.author}`}</p></div>
              <div className="flex sm:flex-col gap-2 shrink-0"><button type="button" onClick={() => setEditing({ ...item })} className="inline-flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200"><Pencil size={15} /> Edit</button><button type="button" onClick={() => deleteNews(item)} className="inline-flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-rose-50 text-rose-700 text-sm font-semibold hover:bg-rose-100"><Trash2 size={15} /> Delete</button></div>
            </article>
          ))}
        </div>
      )}
      {editing && <div className="fixed inset-0 z-50 bg-slate-950/60 p-4 overflow-y-auto"><div className="min-h-full flex items-center justify-center"><form onSubmit={saveEdit} className="bg-white w-full max-w-2xl rounded-xl p-5 sm:p-7 shadow-2xl"><div className="flex justify-between items-center mb-5"><h2 className="text-xl font-bold text-slate-800">Edit News Post</h2><button type="button" onClick={() => setEditing(null)} aria-label="Close edit dialog" className="p-2 rounded-lg hover:bg-slate-100"><X size={20} /></button></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{editableFields.map(([name, label]) => <label key={name} className={name === 'shortDescription' ? 'sm:col-span-2 text-sm font-semibold text-slate-700' : 'text-sm font-semibold text-slate-700'}>{label}<input name={name} value={editing[name] || ''} onChange={updateEditing} required={['title', 'category', 'shortDescription', 'publishedDate'].includes(name)} className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg font-normal focus:outline-none focus:ring-2 focus:ring-emerald-500" /></label>)}<label className="sm:col-span-2 text-sm font-semibold text-slate-700">Full Content<textarea name="fullContent" value={editing.fullContent || ''} onChange={updateEditing} required rows="8" className="mt-1 w-full px-3 py-2 border border-slate-300 rounded-lg font-normal resize-y focus:outline-none focus:ring-2 focus:ring-emerald-500" /></label></div><div className="flex justify-end gap-3 mt-6"><button type="button" onClick={() => setEditing(null)} className="px-4 py-2 rounded-lg border border-slate-300 font-semibold text-slate-700">Cancel</button><button type="submit" disabled={saving} className="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold disabled:bg-slate-400">{saving ? 'Saving...' : 'Save Changes'}</button></div></form></div></div>}
    </section>
  );
};

export default NewsManager;