import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import GoogleBtn from './components/GoogleBtn';
import Dashboard from './pages/Dashboard/index';
import Navbar from "./components/Navbar";
import AuthRedirect from './utils/AuthRouteRedirect';
import Profile from './pages/Profile';

const Layout = ({ children }: any) => {

  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/';
  // const user = localStorage.getItem('user');
  // const token = localStorage.getItem('token');

  return (
    <div>
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}

const AuthCheck = ({ children }: any) => {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  // If user is logged in and tries to visit login page, redirect to dashboard
  if (user && token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<AuthCheck><GoogleBtn /></AuthCheck>} />
          <Route path="/dashboard" element={<AuthRedirect><Dashboard /></AuthRedirect>} />
          <Route path='/profile' element={<AuthRedirect><Profile /></AuthRedirect>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
