import './App.css'
import MainContent from './Components/MainContent/MainContent.jsx'
import Header from './Components/Header/Header.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import SideNav from './Components/SideNav/SideNav.jsx'
import Layout from './Components/Layout/Layout.jsx'

function App() {

  return (
    <Layout>
       <Header />
      <SideNav />
      <div className='dashboard'>
        <Navbar />
        <MainContent />
      </div>
    </Layout>
  )
}

export default App