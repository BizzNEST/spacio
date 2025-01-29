import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './SideNav/SideNav.jsx'
import SideNav from './SideNav/SideNav.jsx'
import Layout from './Layout/Layout.jsx'

function App() {
  const [count, setCount] = useState(0)

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
