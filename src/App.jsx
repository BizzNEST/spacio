import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import SideNav from './components/SideNav/SideNav.jsx';
import Layout from './components/Layout/Layout.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Header from './components/Header/Header.jsx';
import Login from './pages/login.jsx';
import { RouterProvider } from 'react-router-dom';
import { useRouter } from './pages/Routes.jsx';

const routes = useRouter();

function App() {
  return (
    <RouterProvider router={routes}></RouterProvider>
  );
}

export default App;
