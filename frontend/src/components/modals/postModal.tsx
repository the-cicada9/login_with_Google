import { useState } from "react";
import { 
  Modal, Box, TextField, Button, IconButton, Typography, Popover, Chip 
} from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from "@mui/icons-material/Close";
import TagIcon from "@mui/icons-material/Tag";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import useAuthStore from "../../store/authStore";
import { toast } from "react-toastify";

const CreatePostModal = ({ open, handleClose, handlePostSubmit }: any) => {
  const [postData, setPostData] = useState<any>({
    content: "",
    image: null,
    tags: [],
  });

  const token = useAuthStore((state: any) => state.token);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState<null | HTMLElement>(null);
  const [tagInput, setTagInput] = useState(""); // Track input for tags
  const [showTagInput, setShowTagInput] = useState(false); // Toggle input field

  // Handle text input change
  const handleChange = (e: any) => {
    setPostData({ ...postData, content: e.target.value });
  };

  // Handle image upload preview
  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPostData({ ...postData, image: imageUrl });
    }
  };

  // Open Emoji Picker
  const handleEmojiClick = (event: React.MouseEvent<HTMLElement>) => {
    setEmojiAnchorEl(event.currentTarget);
  };

  // Close Emoji Picker
  const handleEmojiClose = () => {
    setEmojiAnchorEl(null);
  };

  // Add Emoji to text field
  const handleEmojiSelect = (emojiObject: any) => {
    setPostData({ ...postData, content: postData.content + emojiObject.emoji });
  };

  // Toggle tag input
  const handleTagButtonClick = () => {
    setShowTagInput(!showTagInput);
  };

  // Add tags
  const handleAddTag = (e: any) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setPostData({ ...postData, tags: [...postData.tags, tagInput.trim()] });
      setTagInput(""); // Reset input field
    }
  };

  // Remove a tag
  const handleRemoveTag = (tagToRemove: string) => {
    setPostData({ ...postData, tags: postData.tags.filter((tag:any) => tag !== tagToRemove) });
  };

  // API call to save the post
  const savePost = async () => {
    try {
      console.log(postData, ">>>postData");

      const response = await axios.post(
        "http://localhost:3000/posts/save-post",
        postData,
        { headers: { Authorization: token } }
      );

      if (response.status === 200) {
        toast.success("Post Created Successfully");
        handleClose(); // Close the modal after success
      } else {
        toast.error("Failed to create post");
      }
    } catch (err) {
      console.error(err, ">>>error");
      toast.error("An error occurred while creating the post");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    await savePost();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 750,
          maxHeight: 700,
          overflowY: "auto",
          bgcolor: "white",
          p: 3,
          borderRadius: 3,
          boxShadow: 4,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" fontWeight="600">
            Create Post
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Text Area */}
        <TextField
          multiline
          rows={6}
          fullWidth
          placeholder="Write Here"
          value={postData.content}
          onChange={handleChange}
          sx={{ mb: 2, fontFamily: "Poppins, sans-serif" }}
        />

        {/* Upload, Emoji & Tags Section */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <input type="file" accept="image/*" hidden id="upload-image" onChange={handleImageUpload} />
          <label htmlFor="upload-image">
            <IconButton component="span">
              <InsertPhotoIcon />
            </IconButton>
          </label>

          <IconButton onClick={handleEmojiClick}>
            <EmojiEmotionsIcon />
          </IconButton>

          <IconButton onClick={handleTagButtonClick}>
            <TagIcon />
          </IconButton>
        </Box>

        {/* Emoji Picker Popover */}
        <Popover
          open={Boolean(emojiAnchorEl)}
          anchorEl={emojiAnchorEl}
          onClose={handleEmojiClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        </Popover>

        {/* Tags Input */}
        {showTagInput && (
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Type a tag and press Enter"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            sx={{ mb: 2 }}
          />
        )}

        {/* Display Tags */}
        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
          {postData.tags.map((tag: string, index: number) => (
            <Chip
              key={index}
              label={tag}
              onDelete={() => handleRemoveTag(tag)}
              sx={{ bgcolor: "#FFFACD", fontWeight: "bold" }} // Light yellow background
            />
          ))}
        </Box>

        {/* Image Preview */}
        {postData.image && (
          <Box sx={{ position: "relative", width: "100%", mb: 2 }}>
            <img src={postData.image} alt="Preview" style={{ width: "100%", borderRadius: "10px" }} />
            <IconButton
              sx={{ position: "absolute", top: 5, right: 5, bgcolor: "rgba(0,0,0,0.5)", color: "white" }}
              onClick={() => setPostData({ ...postData, image: null })}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        )}

        {/* Buttons */}
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" color="error" onClick={handleClose} sx={{ fontFamily: "Poppins, sans-serif" }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ fontFamily: "Poppins, sans-serif" }}>
            Publish
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default CreatePostModal;
