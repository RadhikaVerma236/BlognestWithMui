// components/WriteBlogForm.tsx
import {
  Box,
  Button,
  IconButton,
  Container,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const categories = [
  "Wellness & Self-Care",
  "Personal Growth",
  "Home & Living",
  "Food & Nutrition",
  "Fitness & Movement",
  "Travel & Experiences",
  "Work & Life Balance",
  "Relationships & Social Life",
  "Style & Fashion",
];

const WriteBlogForm = () => {
  const navigate = useNavigate();

  // Get logged-in user from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "null");

  // If no user found, redirect to login
  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
  }, [navigate, user]);

  // Form state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [imageBase, setImageBase] = useState("");
  const [imageName, setImageName] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageBase(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setImageBase("");
    setImageName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !author || !category) return;

    
    const newBlog = {
      id: crypto.randomUUID(), // ✅ unique ID
      title,
      content,
      author,
      category,
      imageBase,
      createdAt: new Date().toISOString(),
      userEmail: user.email, // associate with logged-in user
    };

    const stored = localStorage.getItem("blogs");
    const blogs = stored ? JSON.parse(stored) : [];

    blogs.unshift(newBlog);
    localStorage.setItem("blogs", JSON.stringify(blogs));
    navigate("/home");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Write a New Blog
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <TextField
          label="Category"
          select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          {categories.map((cat) => (
            <MenuItem key={cat} value={cat}>
              {cat}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          minRows={5}
          required
        />
        {/* ✅ Show Image Preview if uploaded */}
        {imageBase && (
            <Box sx={{
                position: "relative",
                mt:1,
                border:"1px solid #ccc",
                pt: 1,
                borderRadius: 2,
                display: "flex",
                flexDirection:"column",
                gap:1,
                alignItems:"flex-start",
            }}>
             <Typography variant="body2" color="text.secondary">
              Selected file: {imageName}
            </Typography> 
            <img
              src={imageBase}
              alt="Preview"
              style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: 4 }}
            />

            <IconButton
              size="small"
              onClick={handleImageRemove}
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                m: 0.5,
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>  
        )}
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden onChange={handleImageUpload} />
        </Button>
        
        {/* {imageBase && (
          <Box mt={2}>
            <Typography variant="body2" gutterBottom>
              Preview:
            </Typography>
            <img
              src={imageBase}
              alt="Uploaded Preview"
              style={{ width: "100%", maxHeight: "300px", objectFit: "cover" }}
            />
          </Box>
        )} */}

        <Button variant="contained" type="submit">
          Post Blog
        </Button>
      </Box>
    </Container>
  );
};

export default WriteBlogForm;
