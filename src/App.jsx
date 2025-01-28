import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './SideNav/SideNav.jsx'
import SideNav from './SideNav/SideNav.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='main'>
      <SideNav />
      <div className='dashboard'>

      </div>
    </div>
  )
}

export default App
