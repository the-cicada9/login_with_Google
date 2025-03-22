import { GoogleLogin } from '@react-oauth/google';
import useAuthStore  from '../store/authStore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Box, Paper, Typography } from '@mui/material';

const GoogleBtn = () => {
  const navigate = useNavigate(); // Initialize navigate
  const setUser = useAuthStore((state:any) => state.setUser);

  const handleSuccess = async (credentialResponse:any) => {
    console.log('Google Login Success:', credentialResponse);

    try {
      const res = await fetch('http://localhost:3000/auth/google-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          credential: credentialResponse.credential,
          client_id: '445124890168-k9lhipo1c6rmla8j5l3fsvc5qacvrvnb.apps.googleusercontent.com',
        }),
      });

      const data = await res.json();
      if (data.user && data.token) {
        console.log(">>");
        setUser(data.user, data.token);
        navigate(`/user/${data.user.name}`); // Store user in Zustand
      }
      console.log('Backend Response:', data);
    } catch (error) {
      console.error('Error sending token to backend:', error);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Full height
        backgroundColor: '#f5f5f5',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: '2rem',
          textAlign: 'center',
          borderRadius: '10px',
          backgroundColor: 'white',
        }}
      >
        <Typography variant="h5" gutterBottom>
          Login with Google
        </Typography>
        <GoogleLogin onSuccess={handleSuccess} onError={() => console.log('Login Failed')} />
      </Paper>
    </Box>
  );
};

export default GoogleBtn;
