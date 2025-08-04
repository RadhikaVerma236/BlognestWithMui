import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import WriteBlog from '../pages/WriteBlog';
import MainLayout from '../layout/MainLayout';
import WelcomePage from '../pages/WelcomePage';
import ProfilePage from '../pages/ProfilePage';
import BlogDetailPage from '../pages/BlogDetailPage';
import EditBlogForm from '../components/EditBlogForm';

// Lazy-load all pages and layout
// const WelcomePage = lazy(() => import('../pages/WelcomePage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const Login = lazy(() => import('../pages/Login'));
const HomePage = lazy(() => import('../pages/HomePage'));

// const MainLayout = lazy(() => import('../layout/MainLayout'));
// const WriteBlog = lazy( () => import ('../pages/WriteBlog'));


// Simple auth check
const isAuthenticated = () => {
  return !!localStorage.getItem("user");  //loggedInUser
};

// Optional loading fallback
const Loading = () => <div>Loading...</div>;

const AppRoutes = () => (
  <Suspense fallback={<Loading />}>
  
    <Routes>
      {/* Public Routes */}
      
      <Route path="/" element={<WelcomePage />} />
      
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUpPage />} />

      <Route path="/blogs/:id" element={<BlogDetailPage />} />

      {/* Protected Routes */}
      <Route
        path="/home"
        element={
          isAuthenticated() ? <MainLayout /> : <Navigate to="/" replace />
        }
      >
        <Route index element={<HomePage />} />
        <Route path="write" element={<WriteBlog/>} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="edit/:id" element={<EditBlogForm />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Suspense>
);

export default AppRoutes;
