import React from 'react'

const NavBar = () => {
  return (
    <div className='w-full flex justify-between bg-amber-400 p-6'>
      <h1 className='text-4xl font-extrabold'>NavBar</h1> 
      <div>
        <ul>
            <li className='inline-block p-4'>Home</li>
            <li className='inline-block p-4'>About</li>
            <li className='inline-block p-4'>Contact</li>
        </ul>
      </div>
    </div>
  )
}

export default NavBar
