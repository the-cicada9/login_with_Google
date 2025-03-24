import React, { useState } from "react";
import { Modal, Box, TextField, Button, Select, MenuItem, IconButton, Typography } from "@mui/material";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CloseIcon from "@mui/icons-material/Close";

const CreatePostModal = ({ open, handleClose, handlePostSubmit }:any) => {
  const [postData, setPostData] = useState<any>({
    content: "",
    image: null,
    privacy: "Public",
  });

  // Handle text input change
  const handleChange = (e:any) => {
    setPostData({ ...postData, content: e.target.value });
  };

  // Handle image upload preview
  const handleImageUpload = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPostData({ ...postData, image: imageUrl });
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    handlePostSubmit(postData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 420,
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
          rows={3}
          fullWidth
          placeholder="Write Here"
          value={postData.content}
          onChange={handleChange}
          sx={{ mb: 2, fontFamily: "Poppins, sans-serif" }}
        />

        {/* Upload & Emoji Section */}
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <input type="file" accept="image/*" hidden id="upload-image" onChange={handleImageUpload} />
          <label htmlFor="upload-image">
            <IconButton component="span">
              <InsertPhotoIcon />
            </IconButton>
          </label>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <EmojiEmotionsIcon />
          </IconButton>
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

        {/* Privacy Selection */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography fontWeight="500">Post Privacy</Typography>
          <Select
            value={postData.privacy}
            onChange={(e) => setPostData({ ...postData, privacy: e.target.value })}
            size="small"
            sx={{ fontFamily: "Poppins, sans-serif" }}
          >
            <MenuItem value="Public">Public</MenuItem>
            <MenuItem value="Friends">Friends</MenuItem>
            <MenuItem value="Only Me">Only Me</MenuItem>
          </Select>
        </Box>

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
