
import { Routes, Route } from 'react-router-dom'; 
import Login from './authentication/Login';
import Register from './authentication/Register';
import PasswordReset from './authentication/Forgot-Password';
import PasswordChange from './authentication/Change-Password';
import ProtectedRoute from './ProtectedRoute';
import CommunitiesPage from "./CommunityPage";
import CommunityDetails from "./CommunityDetails";
import Layout from './Layout';

const AppRoutes: React.FC  = () => {
  return (
    <Routes>
      {/* Public Routes (No Layout) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<PasswordReset />} />
      <Route path="/password-change" element={<PasswordChange />} />
      <Route element={<Layout />}>
        <Route path="/" element={<CommunitiesPage />} />
        <Route path="/communautes" element={<CommunityDetails />} />
      </Route>
      {/* Protected Routes (With Layout) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Layout />}>
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;