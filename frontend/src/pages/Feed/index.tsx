import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Avatar,
  IconButton,
  Box,
  Chip,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CommentIcon from "@mui/icons-material/Comment";
import ShareIcon from "@mui/icons-material/Share";
import SetPinCodeModal from "../../components/modals/setPinCode";
import CarouselComponent from "../../components/connectUICarousel"; // Import the carousel
import CreatePostModal from "../../components/modals/postModal";

const FeedCard = ({ post }: any) => {
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 600,
        borderRadius: 2,
        boxShadow: 3,
        mb: 2,
      }}
    >
      <CardContent>
        {/* User Profile Section */}
        <Box display="flex" alignItems="center" gap={2}>
          <Avatar src={post.profilePic} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {post.name}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {post.community} • {post.time}
            </Typography>
          </Box>
        </Box>

        {/* Tags Section */}
        <Box display="flex" gap={1} mt={1} mb={1}>
          {post.tags.map((tag: any, index: any) => (
            <Chip
              key={index}
              label={tag}
              sx={{ backgroundColor: "#ffcc80", fontWeight: "bold" }}
            />
          ))}
        </Box>

        {/* Content Section */}
        <Typography
          variant="body1"
          sx={{ mt: 1, mb: 1, fontFamily: "Poppins" }}
        >
          {post.content}
        </Typography>

        {/* Image Section (if present) */}
        {post.image && (
          <CardMedia
            component="img"
            height="250"
            image={post.image}
            alt="Post Image"
            sx={{ borderRadius: 2, mt: 1, objectFit: "cover", width: "100%" }}
          />
        )}

        {/* Action Buttons Section */}
        <Box display="flex" alignItems="center" gap={2} mt={2}>
          <IconButton>
            <FavoriteIcon
              sx={{ color: "red", fontWeight: "700", fontSize: "18px" }}
            />
            <Typography sx={{ ml: 0.5, fontWeight: "600", fontSize: "15px" }}>
              {post.likes}
            </Typography>
          </IconButton>
          <IconButton>
            <CommentIcon
              sx={{ color: "black", fontSize: "16px", fontWeight: "700" }}
            />
            <Typography sx={{ ml: 0.5, fontWeight: "600", fontSize: "15px" }}>
              {post.comments}
            </Typography>
          </IconButton>
          <IconButton>
            <ShareIcon
              sx={{ color: "black", fontSize: "16px", fontWeight: "700" }}
            />
            <Typography sx={{ ml: 0.5, fontWeight: "600", fontSize: "15px" }}>
              {post.shares}
            </Typography>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

const FeedPage = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "Daisy Deborah",
      profilePic: "https://i.pravatar.cc/40?img=1",
      community: "Awesome Community",
      time: "57m",
      tags: ["Python", "Robots"],
      content:
        "Meet our new high-tech robot - efficient, precise, and ready to take on any challenge!",
      image:
        "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=700&auto=format&fit=crop&q=60",
      likes: "57K",
      comments: "17K",
      shares: "7",
    },
    {
      id: 2,
      name: "John Doe",
      profilePic: "https://i.pravatar.cc/40?img=2",
      community: "Tech Lovers",
      time: "1h",
      tags: ["AI", "Innovation"],
      content:
        "AI is transforming the future of technology. Are you ready for it?",
      image: "",
      likes: "10K",
      comments: "1K",
      shares: "500",
    },
    {
      id: 3,
      name: "Joe joot",
      profilePic: "https://i.pravatar.cc/40?img=1",
      community: "Awesome Community",
      time: "57m",
      tags: ["Python", "Robots"],
      content:
        "Meet our new high-tech robot - efficient, precise, and ready to take on any challenge! Our new robot - the pinnacle of innovation and technology.",
      image:
        "https://images.unsplash.com/photo-1534723328310-e82dad3ee43f?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXJ0aWZpZmljaWFsJTIwaW50ZWxsaWdlbmNlfGVufDB8fDB8fHw%3D",
      likes: "57K",
      comments: "17K",
      shares: "7",
    },
    {
      id: 4,
      name: "Markus Stone",
      profilePic: "https://i.pravatar.cc/40?img=2",
      community: "Tech Lovers",
      time: "1h",
      tags: ["AI", "Innovation"],
      content:
        "AI is transforming the future of technology. Are you ready for it? Our new robot - the pinnacle of innovation and technology. Artificial intelligence (AI) is a set of technologies that enable computers to perform a variety of advanced functions, including the ability to see, understand and translate spoken and written language, analyze data, make recommendations, and more.",
      image:
        "https://images.unsplash.com/photo-1526378722484-bd91ca387e72?q=80&w=1034&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      likes: "10K",
      comments: "1K",
      shares: "500",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);

  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const handlePostModalOpen = () => setPostModalOpen(true);
  const handlePostModalClose = () => setPostModalOpen(false);

  const handlePostSubmit = (postData: any) => {
    console.log("New Post Data:", postData);
    // Here, you can send postData to your API
  };

  return (
    <Box display="flex" justifyContent="center" sx={{ width: "100%", mt: 4 }}>
      {/* Left Section (20%) - Pincode */}
      <Box
        sx={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ position: "fixed" }}
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Set Pincode
        </Button>
        <SetPinCodeModal open={modalOpen} onClose={handleClose} />

        <Button variant="contained" onClick={handlePostModalOpen}>
          Create Post
        </Button>

        {/* Create Post Modal */}
        <CreatePostModal
          open={postModalOpen}
          handleClose={handlePostModalClose}
          handlePostSubmit={handlePostSubmit}
        />
      </Box>

      {/* Center Section (60%) - Feed */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {posts.map((post) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </Box>

      {/* Right Section (20%) - Carousel */}
      <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
        <CarouselComponent />
      </Box>
    </Box>
  );
};

export default FeedPage;
