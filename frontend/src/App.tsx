import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import GoogleBtn from './components/GoogleBtn';
import Dashboard from './pages/Dashboard/index';
import Navbar from "./components/Navbar";
import AuthRedirect from './utils/AuthRouteRedirect';
import Profile from './pages/Profile';
import FeedPage from './pages/Feed';

const Layout = ({ children }: any) => {

  const location = useLocation();
  const hideNavbar = location.pathname === '/login' || location.pathname === '/';
  // const user = localStorage.getItem('user');
  // const token = localStorage.getItem('token');

  return (
    <div>
      <div style={{marginBottom:"90px"}}>
      {!hideNavbar && <Navbar />}
      </div>
      {children}
    </div>
  );
}

const AuthCheck = ({ children }: any) => {
  const userString = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  if(!userString || !token){
    return <>{children}</>
  }

  const user = JSON.parse(userString)

  if (user?.email && user?.name) {
    const emailPrefix = user.email.split("@")[0];
    const oddChars = emailPrefix
    .split("")
    .filter((_:any, index:any) => index % 2 !== 0)
    .join("");

  // Generate a URL-friendly username
  const dynamicUsername = `${oddChars}-${user.name.replace(/\s+/g, "").toLowerCase()}`;

    return <Navigate to={`/user/${encodeURIComponent(dynamicUsername)}`} replace />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/login" element={<AuthCheck><GoogleBtn /></AuthCheck>} />
          <Route path="/user/:id" element={<AuthRedirect><FeedPage /></AuthRedirect>} />
          <Route path="/dashboard" element={<AuthRedirect><Dashboard /></AuthRedirect>} />
          <Route path='/profile' element={<AuthRedirect><Profile /></AuthRedirect>}></Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
