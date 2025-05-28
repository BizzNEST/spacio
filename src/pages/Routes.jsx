import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import Login from './Login';
import Layout from '../Components/Layout/Layout';
import ProtectedRoute from '../Components/ProtectedRoute/ProtectedRoute';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Routes */}
      <Route path="/" element={<Login />} />

      {/* Protected Route for Dashboard */}
      <Route element={<ProtectedRoute />}>
        <Route path="/home" element={<Layout />} />
        {/*To Do: Uncomment once Floor Plan is implemented}  */}
        {/* <Route path="/floor-map" element={<p>Floor Plan Page</p>} /> */}
      </Route>
    </>
  )
);

export default routes;
