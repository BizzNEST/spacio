import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Login from './Login';
import Layout from '../components/Layout/Layout';
import Dashboard from '../components/Dashboard/Dashboard';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />

      {/* Protected Route for Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Layout />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
    </>
  )
);

export default routes;
