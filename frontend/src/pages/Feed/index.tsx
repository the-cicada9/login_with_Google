import  { useEffect, useState } from "react";
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
// import CarouselComponent from "../../components/connectUICarousel"; // Import the carousel
import CreatePostModal from "../../components/modals/postModal";
import axios from "axios";
import { toast } from "react-toastify";
import useAuthStore from "../../store/authStore";
import usePostStore from "../../store/postStore";

const FeedCard = ({ post }: any) => {
  const token = useAuthStore((state) => state.token);
  const setPosts = usePostStore((state) => state.setPosts);

  // console.log(posts , ">>>posts");
  

  const handleLikePost = async (postId: any) => {
    try{
      console.log(postId , ">>//post ki id");
      
      const response = await axios.post("http://localhost:3000/posts/like-unlike-post" , {postId} , {
        headers : {Authorization : token}
      })

      
      if (response.status === 200) {
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes === 0 ? 1 : response.data.liked ? post.likes + 1 : post.likes - 1,
                }
              : post
          )
        );

        toast.success(response.data.message);
      }
    }catch(err:any){
      console.log(err);
      toast.error(err);
    }
  }
  return (
    <Card
      sx={{
        width: "100%",
        maxWidth: 780,
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
              {post.email} • {post.time}
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
          <IconButton onClick={() => {handleLikePost(post.id)}}>
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
  const token = useAuthStore((state) => state.token);
  // const [posts, setPosts] = useState<any>([]);

  const { setPosts } = usePostStore.getState()
  const posts = usePostStore((state:any) => state.posts)

  const getTimeAgo = (timestamp: string) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
  
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;
  
    // Show full date if older than 7 days
    return postDate.toLocaleDateString("en-US", { 
      year: "numeric", 
      month: "short", 
      day: "numeric" 
    });
  };

  const getAllPosts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/posts/getAllPosts" , 
      {
        headers: { Authorization: token },
      }
      );

      console.log(response , ">>res");
      
      const formattedInfo = response?.data?.posts.map((post: any) => ({
        id: post._id,
        name: post?.user?.name,
        email: post?.user?.email,
        profilePic: post?.user?.picture,
        content: post?.content,
        image: post?.image,
        tags: post?.tags,
        likes: post?.likes?.length,
        comments: post?.comments?.length,
        shares: post?.shares,
        time: getTimeAgo(post?.createdAt),
      }))
      setPosts(formattedInfo);
      console.log(response , ">>>res");
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

console.log(posts , ">>////");

  useEffect(() => {
    try{
      getAllPosts();

    }catch(err){
      console.error(err);
      toast.error("An error occurred while fetching all the posts");
    }
  },[])

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
        {posts.map((post:any) => (
          <FeedCard key={post.id} post={post} />
        ))}
      </Box>

      {/* Right Section (20%) - Carousel */}
      <Box sx={{ width: "20%", display: "flex", justifyContent: "center" }}>
        {/* <CarouselComponent /> */}
        <Button
          sx={{ position: "fixed" }}
          variant="contained"
          color="primary"
          onClick={handleOpen}
        >
          Set Pincode
        </Button>
        <SetPinCodeModal open={modalOpen} onClose={handleClose} />
      </Box>
    </Box>
  );
};

export default FeedPage;
