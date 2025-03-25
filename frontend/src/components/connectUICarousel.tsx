import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent, Avatar, Typography, Button, Box } from "@mui/material";
import useAuthStore from "../store/authStore";
import axios from "axios";

const CarouselComponent = () => {
  const { token } = useAuthStore();
  const [profiles, setProfiles] = useState<any>([]);

  const fetchUsers = async () => {
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:3000/users/users-to-connect", {
        headers: { Authorization: token },
      });

      if (response.data.success) {
        setProfiles(response.data.users);
      }
    } catch (error) {
      console.error("Error while fetching users:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: profiles.length > 3 ? 3 : profiles.length, // Adjust slides based on available profiles
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 800, mx: "auto", overflow: "hidden" }}>
      {profiles.length > 0 ? (
        <Slider {...settings}>
          {profiles.map((profile: any, index: number) => (
            <Box key={index} sx={{ px: 1 }}> {/* Wrap each card for proper spacing */}
              <Card
                sx={{
                  width: 250,
                  borderRadius: 3,
                  boxShadow: 3,
                  textAlign: "center",
                  padding: 2,
                  backgroundColor: "#FAFAFA",
                  mx: "auto",
                }}
              >
                <Avatar src={profile.picture} sx={{ width: 100, height: 100, margin: "auto", mb: 2 }} />
                <CardContent>
                  <Typography variant="h6" fontWeight="bold">
                    {profile.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                    {profile.email}
                  </Typography>
                  <Button variant="contained" color="primary" fullWidth>
                    Connect
                  </Button>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Slider>
      ) : (
        <Typography textAlign="center" p={2} color="textSecondary">
          No users available to connect.
        </Typography>
      )}
    </Box>
  );
};

export default CarouselComponent;
