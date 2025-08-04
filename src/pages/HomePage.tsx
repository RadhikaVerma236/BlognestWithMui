import { Autocomplete, Box, Button, TextField, Typography, useTheme } from '@mui/material';
// import Navbar from '../layout/Navbar';
import {useEffect, useState} from "react";
import BlogCard from '../components/BlogCard';
import type { Blog } from '../components/BlogCard';
import HeroSection from '../components/HeroSection';

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

const HomePage = () => {
  const [blogs, setBlogs]= useState<Blog[]>([]);
  const [visibleCount, setVisibleCount]=useState(6);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const theme = useTheme();

  useEffect(()=>{
    const storedBlogs = JSON.parse(localStorage.getItem("blogs") || "[]");
    //Sort by newest first
    const sorted= storedBlogs.sort(
      (a:Blog, b:Blog) =>new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
);
setBlogs(sorted);
  }, []);

  // Filter blogs by selected category (if selected)
  const filteredBlogs = selectedCategory
    ? blogs.filter((blog) => blog.category === selectedCategory)
    : blogs;

  return (
    <>
    <Box sx={{ overflowX: "hidden" }}>
    <HeroSection />
    </Box>
    <Box id="blog-section" sx={{ px: 4, py: 6 }}>
      {/* Heading + Toggle Button */}
      <Box
        mb={4}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        
      >
        <Typography variant="h3" 
        sx={{
      fontWeight: 700,
      fontSize: { xs: "1.8rem", sm: "2.2rem", md: "2.8rem" },
      background: "linear-gradient(to right, #14B8A6, #2DD4BF)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
    }}>Discover Stories</Typography>

      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        {/* Category Selector */}
          <Autocomplete
            value={selectedCategory}
            onChange={(_, newValue) => setSelectedCategory(newValue)}
            options={categories}
            sx={{ minWidth: 250,
              "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      backgroundColor: theme.palette.mode === "dark" ? "#1E293B" : "#fff", // dark vs light
      color: theme.palette.text.primary,
      "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: "#14B8A6",
      },
      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#14B8A6",
      },
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "#14B8A6",
    },
             }}
            clearOnEscape
            renderInput={(params) => (
              <TextField {...params} label="Filter by Category" variant="outlined" size="small" />
            )}
          />
          
          {/* View Toggle */}
          <Button
            variant="outlined"
            onClick={() =>
              setViewType((prev) => (prev === "grid" ? "list" : "grid"))
            }
            sx={{
      borderRadius: "12px",
      textTransform: "uppercase",
      fontWeight: 500,
      px: 2,
      py: 1,
      color: "#14B8A6",
      borderColor: "#14B8A6",
      "&:hover": {
        backgroundColor: "#ECFDF5",
        borderColor: "#14B8A6",
      },
    }}
          >
            {viewType === "grid" ? "Switch to List View" : "Switch to Grid View"}
          </Button>
      </Box>
</Box>

      {/* Blog Display */}
      <Box
        sx={{
          display: "flex",
          flexDirection: viewType === "list" ? "column" : "row",
          flexWrap: viewType === "grid" ? "wrap" : "nowrap",
          gap: 3,
          justifyContent: viewType === "grid" ? "space-between" : "flex-start",
        }}
      >
        {filteredBlogs.slice(0, visibleCount).map((blog) => (
          <Box
            key={blog.id}
            sx={{
              width:
                viewType === "grid"
                  ? {
                      xs: "100%",
                      sm: "48%",
                      md: "30%",
                    }
                  : "100%",
            }}
          >
            <BlogCard blog={blog} viewType={viewType} />
          </Box>
        ))}
      </Box>

      {/* ✅ Show this message if no matching blogs */}
{filteredBlogs.length === 0 && (
  <Box textAlign="center" mt={4}>
    <Typography variant="h6" color="text.secondary">
      No blogs found in this category.
    </Typography>
  </Box>
)}

      {/* Load More Button */}
      {visibleCount < filteredBlogs.length && (
        <Box textAlign="center" mt={4}>
          <Button
            variant="contained"
            onClick={() => setVisibleCount((prev) => prev + 6)}
          >
            Load More
          </Button>
        </Box>
      )}
    </Box>
    </>
  );
};

export default HomePage;

