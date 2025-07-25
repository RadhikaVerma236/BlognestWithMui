import { Routes, Route } from 'react-router-dom';
import MainLayout from '../layout/MainLayout';
import WelcomePage from '../pages/WelcomePage';
import SignUpPage from '../pages/SignUpPage';


const AppRoutes = () => (
  <Routes>
    <Route element={<MainLayout/>}>
      <Route path="/" element={<WelcomePage/>} />
      <Route path="/signup" element={<SignUpPage/>} />
      {/* Add login, signup, home here */}
    </Route>
  </Routes>
);

export default AppRoutes;
