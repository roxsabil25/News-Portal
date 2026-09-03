import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeTab, setActiveTab, isOpen, onClose }) => {
  const navigate = useNavigate();
  const menuItems = [
    { id: 'add-news', label: 'Add New Post', icon: '📝' },
    { id: 'all-news', label: 'All News List', icon: '📰' },
    { id: 'analytics', label: 'Analytics', icon: '📊' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <>
      {isOpen && <button type="button" aria-label="Close menu" onClick={onClose} className="fixed inset-0 z-40 bg-slate-950/60 md:hidden" />}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] bg-slate-900 text-white p-5 flex flex-col justify-between shadow-lg transform transition-transform duration-300 md:static md:w-64 md:min-h-screen md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div>
        <div className="text-2xl font-bold tracking-wider mb-8 text-emerald-400 border-b border-slate-700 pb-4">
          ADMIN PANEL
        </div>
        <nav className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="border-t border-slate-800 pt-4">
        <button
          type="button"
          onClick={() => { localStorage.removeItem('adminToken'); navigate('/admin/login', { replace: true }); }}
          className="w-full mb-4 px-4 py-2 rounded-lg text-sm font-semibold text-rose-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          Logout
        </button>
        <div className="text-xs text-slate-500 text-center">
        &copy; {new Date().getFullYear()} News Portal Admin
        </div>
      </div>
      </aside>
    </>
  );
};

export default Sidebar;