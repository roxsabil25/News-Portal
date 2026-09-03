import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin');
      } else {
        setError(data.message || 'Login failed!');
      }
    } catch {
      setError('Server connection failed!');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-slate-800 text-center">Admin Login</h2>
        {error && <div className="p-3 mb-4 text-sm bg-rose-100 text-rose-700 rounded-lg">{error}</div>}
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">Username</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border rounded-lg"
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-semibold mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full px-3 py-2 border rounded-lg"
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          />
        </div>
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;