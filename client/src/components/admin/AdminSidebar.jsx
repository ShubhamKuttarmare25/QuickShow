import React from 'react'
import { assets } from '../../assets/assets'
import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const AdminSidebar = () => {

  const user = {
    firstName: 'Admin',
    lastName: 'User',
    imageUrl: assets.profile,
  }

  const adminNavLinks = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
    { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
    { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
    { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
  ]

  const location = useLocation()

  return (
    <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-r border-gray-300/20 text-sm'>
      <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={user.imageUrl} alt="sidebar" />
      <p className='mt-2 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>
      <div className='w-full'>
        {adminNavLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `relative flex items-center max-md:justify-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 ${
                isActive
                  ? 'bg-[rgba(248,69,101,0.1)] text-[color:var(--color-primary)] group'
                  : 'text-gray-400'
              }`
            }
          >
            <link.icon className='w-5 h-5' />
            <p className='max-md:hidden'>{link.name}</p>
            <span
              className={`w-1.5 h-10 rounded-1 right-0 absolute ${
                location.pathname === link.path ? 'bg-[var(--color-primary)]' : ''
              }`}
            />
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default AdminSidebar
