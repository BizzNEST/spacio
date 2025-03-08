import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './Login';
import Layout from '../components/Layout/Layout';
import Dashboard from '../Dashboard/Dashboard';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';

export const useRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
      <Route path="/home" element={<Layout />} />
    
      <Route path="/" element={<Login />} />
    </>
    )
  );
