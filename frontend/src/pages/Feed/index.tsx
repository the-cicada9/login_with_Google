import React, { useState } from 'react';
import { Container, TextField, Card, CardContent, Typography, Avatar, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';

const FeedPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 1,
      name: "John Doe",
      profilePic: "https://i.pravatar.cc/40?img=1",
      date: "March 20, 2025",
      content: "This is my first post!",
      likes: 5,
      comments: 2
    },
    {
      id: 2,
      name: "Jane Smith",
      profilePic: "https://i.pravatar.cc/40?img=2",
      date: "March 19, 2025",
      content: "Loving the new UI updates!",
      likes: 10,
      comments: 4
    },
    {
      id: 3,
      name: "Alice Brown",
      profilePic: "https://i.pravatar.cc/40?img=3",
      date: "March 18, 2025",
      content: "Enjoying my coffee ☕",
      likes: 3,
      comments: 1
    },
    {
      id: 4,
      name: "Mike Johnson",
      profilePic: "https://i.pravatar.cc/40?img=4",
      date: "March 17, 2025",
      content: "Excited for the weekend!",
      likes: 7,
      comments: 3
    }
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    console.log("Search Input:", e.target.value);
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => post.id === postId ? { ...post, likes: post.likes + 1 } : post));
  };

  return (
    <Container sx={{ backgroundColor: "#3333", padding: 3, borderRadius: 2, width:"50%",  maxWidth: "sm", mt: "12px", height: "90vh" }}>
      {/* Search Bar (Fixed) */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 2, backgroundColor: "white", borderRadius: 1, position: "sticky", top: 0, zIndex: 10 }}
      />

      {/* Scrollable Posts Section with Hidden Scrollbar */}
      <Box
        sx={{
          maxHeight: "80vh",
          overflowY: "scroll",
          pr: 1,
          /* Hide scrollbar */
          scrollbarWidth: "none", // Firefox
          "&::-webkit-scrollbar": { display: "none" } // Chrome, Safari
        }}
      >
        {posts.map(post => (
          <Card key={post.id} sx={{ mb: 2, padding: 2 }}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                <Avatar src={post.profilePic} />
                <Box>
                  <Typography variant="h6">{post.name}</Typography>
                  <Typography variant="body2" color="textSecondary">{post.date}</Typography>
                </Box>
              </Box>
              <Typography variant="body1" sx={{ mt: 1 }}>{post.content}</Typography>
              <Box display="flex" gap={1} mt={1}>
                <IconButton color="primary" onClick={() => handleLike(post.id)}>
                  <FavoriteIcon /> <Typography sx={{ ml: 0.5 }}>{post.likes}</Typography>
                </IconButton>
                <IconButton color="secondary">
                  <CommentIcon /> <Typography sx={{ ml: 0.5 }}>{post.comments}</Typography>
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
}

export default FeedPage;
