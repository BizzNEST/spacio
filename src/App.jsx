import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import SideNav from './components/SideNav/SideNav.jsx';
import Layout from './components/Layout/Layout.jsx';
import Dashboard from './Dashboard/Dashboard.jsx';
import Header from './Components/Header/Header.jsx';
import Login from './pages/login.jsx';

function App() {
  return (
    <Login />
    /*<Layout>
      <Header />
      <SideNav />

      <Dashboard title="Meeting Rooms">
        <Navbar />
      </Dashboard>
    </Layout>*/
  );
}

export default App;
