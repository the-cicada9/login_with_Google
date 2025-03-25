import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControlLabel,
  Switch,
  Box,
  Typography,
  Alert
} from '@mui/material';
import axios from 'axios';
import useAuthStore from '../../store/authStore';

interface SetPinCodeModalProps {
  open: boolean;
  onClose: () => void;
}

const SetPinCodeModal: React.FC<SetPinCodeModalProps> = ({ open, onClose }) => {
  const [pincode, setPincode] = useState('');
  const [locationEnabled, setLocationEnabled] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const token = useAuthStore((state:any) => state.token);
  console.log(token,">>pincode");
  

  const handlePincodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value.replace(/\D/g, '').slice(0, 6);
    setPincode(value);
  };

  const handleLocationToggle = async () => {
    if (!locationEnabled) {
      if ("geolocation" in navigator) {
        try {
          const permissionStatus = await navigator.permissions.query({ name: "geolocation" });
  
          if (permissionStatus.state === "denied") {
            setError("Location permission is denied. Please allow access in your browser settings.");
            return;
          }
  
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              const { latitude, longitude } = position.coords;
              console.log(`User's Location: Lat=${latitude}, Lon=${longitude}`);
  
              try {
                const response = await fetch(
                  `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                );
                const data = await response.json();
                console.log(data, ">>>loc");
  
                if (data && data.address) {
                  const userPincode = data.address.postcode || "";
                  setPincode(userPincode);
                  console.log("Detected Pincode:", userPincode);
                }
              } catch (error) {
                console.error("Error fetching location details:", error);
                setError("Failed to retrieve location details.");
              }
            },
            (error) => {
              console.error("Geolocation error:", error);
              setError("Location access denied or unavailable.");
            },
            { enableHighAccuracy: true, timeout: 10000 }
          );
        } catch (error) {
          console.error("Error checking geolocation permissions:", error);
          setError("Error accessing location settings.");
        }
      } else {
        setError("Geolocation is not supported by your browser.");
      }
    }
    setLocationEnabled(!locationEnabled);
  };
  

  const handleSubmit = async () => {
    if (pincode.length !== 6) {
      setError('Please enter a valid 6-digit pincode');
      return;
    }

    setLoading(true);
    setError('');



    try {
      const response = await axios.post('http://localhost:3000/auth/update-pincode', {
        pincode,
        locationEnabled,},
        { headers: { Authorization: token } } );

      if (response.status === 200) {
        onClose();
      }
    } catch (err) {
      setError('Failed to update location settings. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontFamily: "Poppins", fontSize: "15px" }}>
        Set Your Location
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ fontFamily: "Poppins", fontSize: "15px" }} gutterBottom>
            Please enter your pincode and enable location services to get personalized recommendations.
          </Typography>

          <TextField
            fullWidth
            label="Pincode"
            value={pincode}
            onChange={handlePincodeChange}
            margin="normal"
            error={error !== ''}
            helperText={error}
            sx={{ fontFamily: "Poppins", fontSize: "15px" }}
            inputProps={{
              maxLength: 6,
              inputMode: 'numeric'
            }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={locationEnabled}
                onChange={handleLocationToggle}
                color="primary"
              />
            }
            label="Enable Location Services"
            sx={{ mt: 2, fontFamily: "Poppins", fontSize: "14px" }}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2, fontFamily: "Poppins", fontSize: "13px" }}>
              {error}
            </Alert>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" sx={{ fontFamily: "Poppins", fontSize: "15px" }}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
          sx={{ fontFamily: "Poppins", fontSize: "15px" }}
        >
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SetPinCodeModal;
