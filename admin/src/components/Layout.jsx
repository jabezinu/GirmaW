import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { FaGem, FaEnvelope, FaVideo, FaChevronLeft, FaChevronRight, FaBars, FaKey, FaSignOutAlt, FaQuestionCircle } from 'react-icons/fa'
import { ToastContainer } from 'react-toastify'
import { useAuth } from '../contexts/AuthContext'
import ChangePasswordModal from './ChangePasswordModal'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { logout } = useAuth()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false)

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

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { to: '/', label: 'Gemstones', icon: FaGem },
    { to: '/videos', label: 'Videos', icon: FaVideo },
    { to: '/contact-messages', label: 'Contact Messages', icon: FaEnvelope },
    { to: '/faqs', label: 'FAQs', icon: FaQuestionCircle },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={closeMobileSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-white shadow-xl border-r border-gray-200 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${isMobileOpen ? 'translate-x-0 w-64' : '-translate-x-full'
          } ${isCollapsed ? 'md:w-20 lg:w-20 xl:w-20' : 'md:w-56 lg:w-64 xl:w-72'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            {!isCollapsed && (
              <h1 className="text-xl font-bold text-gray-900">Gemstone Admin</h1>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
            >
              {isCollapsed ? <FaChevronRight className="h-4 w-4" /> : <FaChevronLeft className="h-4 w-4" />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={closeMobileSidebar}
                title={isCollapsed ? item.label : undefined}
                className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === item.to || (item.to !== '/' && location.pathname.startsWith(item.to))
                  ? 'bg-indigo-50 text-indigo-700 border-r-2 border-indigo-600 shadow-sm'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } ${isCollapsed ? 'justify-center px-4' : ''}`}
              >
                <item.icon className={`${isCollapsed ? 'text-xl' : 'text-lg mr-3'}`} />
                {!isCollapsed && <span>{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-4 border-t border-gray-200 space-y-1">
            <button
              onClick={() => {
                setIsChangePasswordOpen(true)
                closeMobileSidebar()
              }}
              title={isCollapsed ? 'Change Password' : undefined}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''
                }`}
            >
              <FaKey className={`${isCollapsed ? 'text-xl' : 'text-lg mr-3'}`} />
              {!isCollapsed && <span>Change Password</span>}
            </button>
            <button
              onClick={() => {
                handleLogout()
                closeMobileSidebar()
              }}
              title={isCollapsed ? 'Logout' : undefined}
              className={`w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-200 ${isCollapsed ? 'justify-center' : ''
                }`}
            >
              <FaSignOutAlt className={`${isCollapsed ? 'text-xl' : 'text-lg mr-3'}`} />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      {/* Main content */}
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'md:ml-20 lg:ml-20 xl:ml-20' : 'md:ml-56 lg:ml-64 xl:ml-72'}`}>
        {/* Mobile header */}
        <div className="md:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-4 flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors"
          >
            <FaBars className="h-5 w-5" />
          </button>
          <h1 className="ml-4 text-lg font-bold text-gray-900">Gemstone Admin</h1>
        </div>

        <main className="flex-1 p-6 lg:p-8">
          {children}
        </main>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  )
}