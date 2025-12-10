import React from 'react'
import { NavLink } from 'react-router-dom'
const NavBar = () => {
  const linkBase =
    'inline-flex items-center px-3 py-1 text-sm font-medium rounded-md transition-colors duration-150';
  const inactive = 'text-slate-800 hover:text-slate-50 hover:bg-amber-500/70';
  const active = 'bg-white text-amber-700 shadow-sm';

  return (
    <nav className='w-full flex items-center justify-between bg-amber-400 px-5 py-3'>
      <h1 className='text-2xl font-extrabold text-slate-900'>Patient Portal</h1>
      <div className='flex items-center gap-2'>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive}`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/documents"
          className={({ isActive }) =>
            `${linkBase} ${isActive ? active : inactive}`
          }
        >
          Documents
        </NavLink>
      </div>
    </nav>
  )
}

export default NavBar
