import { useState, useEffect } from 'react'
import { FaTrash, FaEnvelope, FaEnvelopeOpen } from 'react-icons/fa'
import contactMessageService from '../services/contactMessageService'

export default function ContactMessagesList() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchMessages()
  }, [])

  const fetchMessages = async () => {
    try {
      setLoading(true)
      const data = await contactMessageService.getAll()
      setMessages(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch contact messages')
      console.error('Error fetching contact messages:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact message?')) {
      try {
        await contactMessageService.delete(id)
        setMessages(messages.filter(message => message._id !== id))
      } catch (err) {
        setError('Failed to delete contact message')
        console.error('Error deleting contact message:', err)
      }
    }
  }

  const handleMarkAsRead = async (id) => {
    try {
      await contactMessageService.update(id, { read: true })
      setMessages(messages.map(message =>
        message._id === id ? { ...message, read: true } : message
      ))
    } catch (err) {
      setError('Failed to mark message as read')
      console.error('Error marking message as read:', err)
    }
  }

  const handleToggleDisplayOnHome = async (id) => {
    try {
      const message = messages.find(m => m._id === id)
      const newDisplayOnHome = !message.displayOnHome
      await contactMessageService.update(id, { displayOnHome: newDisplayOnHome })
      setMessages(messages.map(message =>
        message._id === id ? { ...message, displayOnHome: newDisplayOnHome } : message
      ))
    } catch (err) {
      setError('Failed to update display status')
      console.error('Error updating display status:', err)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
        <button
          onClick={fetchMessages}
          className="ml-4 bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1 rounded text-sm"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Contact Messages</h1>
            <p className="text-gray-600">
              View and manage customer inquiries and testimonials
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-500">
              {messages.filter(m => !m.read).length} unread
            </div>
          </div>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message._id} className={`bg-white rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden ${
            message.read
              ? 'border-gray-200'
              : 'border-indigo-300 bg-gradient-to-r from-indigo-50 to-blue-50'
          }`}>
            <div className="p-6">
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                <div className="flex items-start space-x-3 mb-3 sm:mb-0">
                  <div className={`p-2 rounded-lg ${
                    message.read ? 'bg-gray-100' : 'bg-indigo-100'
                  }`}>
                    {message.read ? (
                      <FaEnvelopeOpen className="h-5 w-5 text-gray-500" />
                    ) : (
                      <FaEnvelope className="h-5 w-5 text-indigo-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Message from {message.name}
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
                      <p className="text-sm text-gray-600">{message.email}</p>
                      <span className="text-sm text-gray-500">{formatDate(message.createdAt)}</span>
                    </div>
                  </div>
                </div>

                {/* Status Badges */}
                <div className="flex flex-wrap gap-2">
                  {!message.read && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                      Unread
                    </span>
                  )}
                  {message.displayOnHome && (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
                      Displayed on Home
                    </span>
                  )}
                </div>
              </div>

              {/* Message Content */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">{message.message}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3">
                {!message.read && (
                  <button
                    onClick={() => handleMarkAsRead(message._id)}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 hover:border-indigo-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                  >
                    <FaEnvelopeOpen className="mr-2 h-4 w-4" />
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleToggleDisplayOnHome(message._id)}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                    message.displayOnHome
                      ? 'text-green-700 bg-green-50 border-green-200 hover:bg-green-100 hover:border-green-300 focus:ring-green-500'
                      : 'text-gray-700 bg-gray-50 border-gray-200 hover:bg-gray-100 hover:border-gray-300 focus:ring-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  {message.displayOnHome ? (
                    <>
                      <span className="mr-2">✓</span>
                      Displayed on Home
                    </>
                  ) : (
                    <>
                      <span className="mr-2">+</span>
                      Display on Home
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleDelete(message._id)}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  <FaTrash className="mr-2 h-4 w-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {messages.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaEnvelope className="h-10 w-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No contact messages yet</h3>
          <p className="text-gray-500 max-w-md mx-auto">
            When customers send you messages through the contact form, they'll appear here for you to review and manage.
          </p>
        </div>
      )}
    </div>
  )
}