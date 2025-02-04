import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import SideNav from './components/SideNav/SideNav.jsx'
import Layout from './components/Layout/Layout.jsx'
import Dashboard from './Dashboard/Dashboard.jsx'

function App() {

  return (
    <Layout>
      <div className='header'></div>
      <SideNav />
      <Dashboard title="Meeting Rooms">
        <Navbar />
      </Dashboard> 
  
    </Layout>
  )
}

export default App