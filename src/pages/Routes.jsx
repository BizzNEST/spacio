import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Routes,
} from 'react-router-dom';
import Login from './Login';
import Layout from '../Components/Layout/Layout';

//const routes = 6;

export const useRouter = () =>
  createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="home" element={<Layout />} />
        <Route path="login" element={<Login />} />
      </>
    )
  );
