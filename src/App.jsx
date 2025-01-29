import './App.css'
import Navbar from './components/Navbar/Navbar.jsx'
import SideNav from './components/SideNav/SideNav.jsx'
import Layout from './components/Layout/Layout.jsx'

function App() {

  return (
    <Layout>
      <div className='header'></div>
      <SideNav />
      <div className='dashboard'>
        <Navbar />
      </div>
    </Layout>
  )
}

export default App