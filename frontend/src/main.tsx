import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId="445124890168-k9lhipo1c6rmla8j5l3fsvc5qacvrvnb.apps.googleusercontent.com">
      <App />
  </GoogleOAuthProvider>
)
