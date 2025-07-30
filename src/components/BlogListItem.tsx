import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import type { Blog } from "./BlogCard";

const BlogListItem = ({blog} : {blog: Blog}) =>{
    return(
        <Card sx={{ display: "flex", gap: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 180, height: "100%", objectFit: "cover" }}
        image={blog.imageBase?.trim() !== "" ? blog.imageBase : "/defaultImage.png"}
        alt="Blog"
      />
      <CardContent>
        <Typography variant="caption" color="text.secondary">
          {blog.category.toUpperCase()}
        </Typography>
        <Typography variant="h6">{blog.title}</Typography>
        <Typography variant="body2" sx={{ mb: 1 }}>
          {blog.author} • {new Date(blog.createdAt).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" noWrap>
          {blog.content}
        </Typography>
      </CardContent>
    </Card>
    );
};

export default BlogListItem;