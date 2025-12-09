import React from 'react'
import {Link} from 'react-router-dom'
const NavBar = () => {
  return (
    <div className='w-full flex justify-between bg-amber-400 p-6'>
      <h1 className='text-4xl font-extrabold'>NavBar</h1> 
      <div>
        <ul>
        <Link to="/" className='inline-block p-4 cursor-pointer'> Home</Link>
        <Link to="/documents" className='inline-block p-4 cursor-pointer'> Documents</Link>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
