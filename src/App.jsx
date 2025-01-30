import './App.css'
import Header from './components/Header/Header.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import SideNav from './components/SideNav/SideNav.jsx'
import Layout from './components/Layout/Layout.jsx'

function App() {

  return (
 
     
    <Layout>
       <Header />
      <SideNav />
      <div className='dashboard'>
        <Navbar />
      </div>
    </Layout>
  )
}

export default App