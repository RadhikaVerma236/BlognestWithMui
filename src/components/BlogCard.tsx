// components/BlogCard.tsx

import { Box, Button, Card, CardContent, CardMedia, Chip, Typography, IconButton } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";



export type Blog = {
    id : string,
    imageBase?: string;
  category: string;
  author: string;
  createdAt: string;
  title: string;
  content: string;
  userEmail: string; 
};

// ✅ Props interface with optional viewType
interface BlogCardProps {
  blog: Blog;
  viewType?: "grid" | "list";
  showActions?: boolean; // 👈 to control visibility
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}


const BlogCard = ({blog, viewType = "grid",showActions,
  onEdit,
  onDelete,}: BlogCardProps) =>{
    return(
        <Card sx={{
        display: viewType === "list" ? "flex" : "block",
        flexDirection: viewType === "list" ? "row" : "column",
        height: viewType === "list" ? 200 : "100%",
      }}>
            {/* Blog image */}
      {/* {blog.imageBase && ( */}
        <CardMedia
          component="img"
        //   height="180"
          image={blog.imageBase?.trim() !== ""? blog.imageBase : "/defaultImage.png"}
          alt="Blog Image"
          sx={{
          width: viewType === "list" ? 200 : "100%",
          height: viewType === "list" ? "100%" : 180,
          objectFit: "cover",
        }}
        />
      {/* )} */}

      <CardContent sx={{ flexGrow: 1 }}>
        {/* Category tag */}
        <Chip
          label={blog.category}
          color="primary"
          size="small"
          sx={{ mb: 1 }}
        />

        {/* Title */}
        <Typography variant="h6" gutterBottom>
          {blog.title}
        </Typography>

        {/* Author and time */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
          <PersonIcon fontSize="small" />
          <Typography variant="body2">{blog.author}</Typography>
          <AccessTimeIcon fontSize="small" sx={{ ml: 2 }} />
          <Typography variant="body2">
            {new Date(blog.createdAt).toLocaleString()}
          </Typography>
        </Box>

        {/* Short preview */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {blog.content.slice(0, 100)}...
        </Typography>

        {/* Read More */}
        <Button
          component={Link}
          to={`/blogs/${blog.id}`}
          size="small"
          sx={{ mt: "auto" }}
        >
          Read More
        </Button>
        {/* Show Edit/Delete if it's the logged-in user's blog */}
{/* {currentUserEmail === blog.userEmail && (
  <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
    <Button variant="outlined" size="small" color="primary">
      Edit
    </Button>
    <Button variant="outlined" size="small" color="error">
      Delete
    </Button>
  </Box>
)} */}
{showActions && (
  <Box display="flex" justifyContent="flex-end" gap={1} px={2} pb={2}>
    <IconButton size="small" color="primary" onClick={() => onEdit?.(blog.id)}>
      <EditIcon fontSize="small" />
    </IconButton>
    <IconButton size="small" color="error" onClick={() => onDelete?.(blog.id)}>
      <DeleteIcon fontSize="small" />
    </IconButton>
  </Box>
)}

        </CardContent>
        </Card>
    );
};

export default BlogCard;