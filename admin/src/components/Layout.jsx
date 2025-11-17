import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { FaGem, FaBook, FaTools, FaEnvelope, FaChevronLeft, FaChevronRight, FaBars, FaPlus } from 'react-icons/fa'

export default function Layout({ children }) {
  const location = useLocation()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(!isMobileOpen)
    } else {
      setIsCollapsed(!isCollapsed)
    }
  }

  const closeMobileSidebar = () => {
    setIsMobileOpen(false)
  }

  const navItems = [
    { to: '/', label: 'Gemstones', icon: FaGem },
    { to: '/courses', label: 'Courses', icon: FaBook },
    { to: '/equipments', label: 'Equipments', icon: FaTools },
    { to: '/contact-messages', label: 'Contact Messages', icon: FaEnvelope },
  ]

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeMobileSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:inset-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isCollapsed ? 'md:w-16' : 'md:w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-900">Gemstone Admin</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMobileSidebar}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))
                    ? 'bg-indigo-100 text-indigo-700'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                <item.icon className="text-lg" />
                {!isCollapsed && <span className="ml-3">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          {/* <div className="p-4 border-t space-y-2">
            <Link
              to="/gemstones/new"
              onClick={closeMobileSidebar}
              className={`flex items-center px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md text-sm font-medium transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <FaPlus className="text-lg" />
              {!isCollapsed && <span className="ml-3">Add Gemstone</span>}
            </Link>
            <Link
              to="/equipments/new"
              onClick={closeMobileSidebar}
              className={`flex items-center px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium transition-colors ${
                isCollapsed ? 'justify-center' : ''
              }`}
            >
              <FaPlus className="text-lg" />
              {!isCollapsed && <span className="ml-3">Add Equipment</span>}
            </Link>
          </div> */}
        </div>
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isCollapsed ? 'md:ml-16' : 'md:ml-64'
        }`}
      >
        {/* Mobile header */}
        <div className="md:hidden bg-white shadow-sm border-b px-4 py-3 flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FaBars />
          </button>
          <h1 className="ml-4 text-lg font-bold text-gray-900">Gemstone Admin</h1>
        </div>

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
}