import React from 'react';
import './SideNav.css';

function SideNav() {
  return (
  <div className='sidenav'>
    <div className='logo-title'>
      <div className='image'></div>
      <p>Digital NEST</p>
    </div>
    <input className='side-search' type="text" placeholder="Jump To.."></input>
    <a className='side-tabs' href='#section'>
      <img src="images/myIcon.jpg"></img>
      Meeting Rooms
    </a>
  </div>
  )
}
export default SideNav