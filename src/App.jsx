import './App.css'
import SideNav from './components/SideNav/SideNav.jsx'
import Layout from './components/Layout/Layout.jsx'

function App() {

  return (
    <Layout>
      <div className='header'></div>
      <SideNav />
      <div className='dashboard'>

      </div>
    </Layout>
  )
}

export default App
