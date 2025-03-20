import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface AuthRedirectProps {
  children: ReactNode;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ children }) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  return user && token ?  <>{children}</> : <><Navigate to="/login" /></>;
};

export default AuthRedirect;
