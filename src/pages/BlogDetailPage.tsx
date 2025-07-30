import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Blog } from "../components/BlogCard";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BlogDetailPage =()=>{
    const {id} = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const defaultImage = "/defaultImage.png"; 

    useEffect(() =>{
      const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    const foundBlog = blogs.find((b: Blog) => b.id === id); 
    setBlog(foundBlog);
    setLoading(false); 
    }, [id]);

    if (loading) {
        return (
            <Box
            sx={{
          display: "flex",
          justifyContent: "center",
          mt: 8,
        }}
            >
                <CircularProgress />
            </Box>
        );
    }
    if (!blog) {
    return (
      <Box sx={{ textAlign: "center", mt: 8 }}>
        <Typography variant="h5">Blog not found.</Typography>
        <Button onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Go Back
        </Button>
      </Box>
    );
  }

  return(
    <Box
    sx={{
        px: { xs: 2, md: 4 },
        py: 6,
        maxWidth: 800,
        mx: "auto", // Center horizontally
      }}
    >
        {/* Back button */}
      <Button
        onClick={() => navigate(-1)}
        startIcon={<ArrowBackIcon />}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Title */}
      <Typography variant="h3" sx={{ mb: 1 }}>
        {blog.title}
      </Typography>

      {/* Author & Date */}
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 3 }}>
        By {blog.author} • {blog.createdAt}
      </Typography>

      {/* Blog image */}
      
        <Box sx={{ mb: 4 }}>
          <Box
    component="img"
    src={blog.imageBase || defaultImage}
    alt={blog.title}
    sx={{
      width: "100%",
      maxHeight: 400,        // ⬅️ Limit image height
      objectFit: "cover",    // ⬅️ Prevent distortion
      borderRadius: 2,
      display: "block",      // ⬅️ Ensures block-level layout
      mx: "auto",            // ⬅️ Center the image horizontally
    }}
  />
        </Box>
    

        {/* Blog content */}
      <Typography
        variant="body1"
        sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}
      >
        {blog.content}
      </Typography>
    </Box>
  );
};

export default BlogDetailPage;