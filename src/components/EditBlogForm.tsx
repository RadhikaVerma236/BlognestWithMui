import {
  Box,
  Button,
  IconButton,
  Container,
  TextField,
  Typography,
  MenuItem,
  Alert,
  Snackbar,
  DialogActions,
  DialogContent,
  DialogTitle,
  Dialog,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
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

const EditBlogForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const blog = location.state?.blog;

  // Get logged-in user
  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.email) {
      navigate("/login");
    }
    if (!blog) {
      navigate("/home");
    }
  }, [navigate, user, blog]);

  // Pre-fill form with blog data
  const [title, setTitle] = useState(blog?.title || "");
  const [content, setContent] = useState(blog?.content || "");
  const [author, setAuthor] = useState(blog?.author || "");
  const [category, setCategory] = useState(blog?.category || "");
  const [imageBase, setImageBase] = useState(blog?.imageBase || "");
  const [imageName, setImageName] = useState("");

   // Dialog & Snackbar States
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

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

     // Show confirmation dialog
  setOpenDialog(true);
};


     const handleDialogConfirm = () => {
    // Proceed to update blog
    const updatedBlog = {
      ...blog,
      title,
      content,
      author,
      category,
      imageBase,
      updatedAt: new Date().toISOString(),
    };

    const stored = localStorage.getItem("blogs");
    const blogs = stored ? JSON.parse(stored) : [];

    const updatedBlogs = blogs.map((b: any) =>
      b.id === blog.id ? updatedBlog : b
    );

    localStorage.setItem("blogs", JSON.stringify(updatedBlogs));
    setOpenDialog(false);
    setOpenSnackbar(true);

    // Delay navigation for the Snackbar to show
    setTimeout(() => {
    navigate("/home");
    }, 500);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box mb={2} display="flex" justifyContent="flex-end">
  <Link
    to="/home"
    style={{
      textDecoration: "none",
      color: "#14B8A6",
      fontWeight: 500,
      fontSize: "0.95rem",
    }}
  >
    ← Back to Home
  </Link>
</Box>
      <Typography variant="h4" gutterBottom>
        Edit Blog
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
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
        {/* Image Preview */}
        {imageBase && (
          <Box
            sx={{
              position: "relative",
              mt: 1,
              border: "1px solid #ccc",
              pt: 1,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              gap: 1,
              alignItems: "flex-start",
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Selected file: {imageName || "Existing Image"}
            </Typography>
            <img
              src={imageBase}
              alt="Preview"
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: 4,
              }}
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

        <Button variant="contained" type="submit">
          Update Blog
        </Button>
      </Box>
      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to update this blog?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleDialogConfirm}>
            Yes, Update
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Blog updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default EditBlogForm;
