// pages/ProfilePage.tsx

import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import BlogCard from "../components/BlogCard";
import type { Blog } from "../components/BlogCard";
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Snackbar, Typography} from "@mui/material";


const ProfilePage = () => {
    const [user, setUser] = useState<{ fullName: string; email: string } | null>(null);
    const [userBlogs, setUserBlogs] = useState<Blog[]>([]);
    const navigate = useNavigate();
    const [blogToDelete, setBlogToDelete] = useState<Blog | null>(null);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false); // ✅ Needed state
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        const storedBlogs = localStorage.getItem("blogs");

        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);

            if (storedBlogs) {
                const parsedBlogs: Blog[] = JSON.parse(storedBlogs);
                const filtered = parsedBlogs.filter(
                    (blog) => blog.userEmail === parsedUser.email
                );
                setUserBlogs(filtered);
            }
        }
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <Box p={4}>
                <Typography>Loading profile...</Typography>
            </Box>
        );
    }

    // ✅ Called when the delete icon is clicked
  const handleDelete = (blogId: string) => {
    const selectedBlog = userBlogs.find((b) => b.id === blogId);
    if (selectedBlog) {
      setBlogToDelete(selectedBlog);
      setConfirmDialogOpen(true);
    }
  };

    const handleConfirmDelete = () => {
  if (!blogToDelete) return;

  const storedBlogs = localStorage.getItem("blogs");
  if (!storedBlogs) return;

  const allBlogs: Blog[] = JSON.parse(storedBlogs);
  const updatedAll = allBlogs.filter((b) => b.id !== blogToDelete.id);
  localStorage.setItem("blogs", JSON.stringify(updatedAll));

  const updatedUserBlogs = userBlogs.filter((b) => b.id !== blogToDelete.id);
  setUserBlogs(updatedUserBlogs);

  setConfirmDialogOpen(false);
  setBlogToDelete(null);
  setShowSnackbar(true);
};


    if (!user) return null;

    //Get initials from name (First + Last)
    const getInitials = (name: string) => {
        if (!name) return ""; // name is undefined/null
        const names = name.trim().split(" ");
        if (names.length === 1) return names[0][0].toUpperCase() || "";
        return (names[0][0]?.toUpperCase() || "") + (names[names.length - 1][0]?.toUpperCase() || "");
    };

    return (
        <Box sx={{ px: 4, py: 6 }}>
            {/* Back to Home Link */}
    <Box mb={2} display="flex" justifyContent="flex-end">
      <Link to="/home" style={{ textDecoration: "none", color: "#14B8A6", fontWeight: 500 }}>
        ← Back to Home
      </Link>
    </Box>
            {/* ===== User Info ===== */}
            <Box
                display="flex"
                alignItems="center"
                gap={3}
                mb={4}
                flexWrap="wrap"
            >
                <Avatar sx={{ bgcolor: "primary.main", width: 64, height: 64, fontSize: 24 }}>
                    {getInitials(user?.fullName)}
                </Avatar>
                <Box>
                    <Typography variant="h5">{user?.fullName}</Typography>
                    <Typography color="text.secondary">{user?.email}</Typography>
                </Box>
            </Box>

            <Divider sx={{ mb: 4 }} />

            {/* ===== User's Blogs ===== */}
            <Typography variant="h6" gutterBottom>
                Your Posts ({userBlogs.length})
            </Typography>

            <Box
                display="flex"
                flexWrap="wrap"
                gap={3}
                justifyContent="flex-start"
            >
                {userBlogs.map((blog) => (
                    <Box
                        key={blog.id}
                        width={{ xs: "100%", sm: "48%", lg: "31%" }}
                        
                    >
                        <BlogCard blog={blog} viewType="grid" 
                        showActions
  onEdit={() => navigate(`/edit/${blog.id}`)}
  onDelete={() => handleDelete(blog.id)} />
                        
                    </Box>
                ))}

                {userBlogs.length === 0 && (
                    <Typography color="text.secondary">
                        You haven't posted any blogs yet.
                    </Typography>
                )}
            </Box>
            {/* Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={3000}
        onClose={() => setShowSnackbar(false)}
        message="Blog deleted!"
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
       {/* Confirmation Dialog */}
      <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this blog? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
        </Box>
    );
};

export default ProfilePage;