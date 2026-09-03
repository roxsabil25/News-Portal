import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('adminToken');
  const isValid = Boolean(token && token.split('.').length === 3);

  if (!isValid) {
    localStorage.removeItem('adminToken');
    return <Navigate to="/admin/login" replace />;
  }
  return children;
};

export default ProtectedRoute;