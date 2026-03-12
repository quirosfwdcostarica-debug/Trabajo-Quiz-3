import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import AdminDashboard from '../Pages/AdminDashboard';
import ClientProfile from '../Pages/ClientProfile';
import Tienda from '../Pages/Tienda';

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/perfil" element={<ClientProfile />} />
        <Route path="/tienda" element={<Tienda />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};