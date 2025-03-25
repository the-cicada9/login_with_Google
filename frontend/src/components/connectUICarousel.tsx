import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Card, CardContent, Avatar, Typography, Button, Box } from "@mui/material";
import useAuthStore from "../store/authStore";
import axios from "axios";



const CarouselComponent = () => {

  const { token } = useAuthStore();
  console.log(token , "from connect");

  const [profiles , setProfiles] = useState<any>([]);

  const fetchUsers = async () => {
    if(!token){
      return;
    }

    try{
      const response = await axios.get("http://localhost:3000/users/users-to-connect", {
        headers : {Authorization: token},
      }) 

      if(response.data.success){
        setProfiles(response.data.users);
      }
    }catch(error){
      console.error("Error while fetching users:", error);
    }
  }

  useEffect(()=>{
    fetchUsers();
  },[token])
  
  console.log(profiles);
  

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 240, maxHeight:"10px", mx: "auto", position:"fixed" }}>
      <Slider {...settings}>
        {profiles.map((profile:any, index:any) => (
          <Card
            key={index}
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
        ))}
      </Slider>
    </Box>
  );
};

export default CarouselComponent;
