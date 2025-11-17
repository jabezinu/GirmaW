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
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Contact Messages</h1>
          <p className="mt-2 text-sm text-gray-700">
            View and manage customer contact messages
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        {messages.map((message) => (
          <div key={message._id} className={`bg-white overflow-hidden shadow rounded-lg border ${message.read ? 'border-gray-200' : 'border-blue-300 bg-blue-50'}`}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  {message.read ? (
                    <FaEnvelopeOpen className="text-gray-400" />
                  ) : (
                    <FaEnvelope className="text-blue-500" />
                  )}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{message.subject}</h3>
                    <p className="text-sm text-gray-500">From: {message.name} ({message.email})</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{formatDate(message.createdAt)}</span>
              </div>

              <div className="mb-4">
                <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
              </div>

              <div className="flex justify-end space-x-3">
                {!message.read && (
                  <button
                    onClick={() => handleMarkAsRead(message._id)}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                  >
                    <FaEnvelopeOpen className="mr-2" />
                    Mark as Read
                  </button>
                )}
                <button
                  onClick={() => handleToggleDisplayOnHome(message._id)}
                  className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors duration-200 ${
                    message.displayOnHome
                      ? 'text-green-700 bg-green-100 hover:bg-green-200 focus:ring-green-500'
                      : 'text-gray-700 bg-gray-100 hover:bg-gray-200 focus:ring-gray-500'
                  } focus:outline-none focus:ring-2 focus:ring-offset-2`}
                >
                  {message.displayOnHome ? '✓ Display on Home' : 'Display on Home'}
                </button>
                <button
                  onClick={() => handleDelete(message._id)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <FaTrash className="mr-2" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {messages.length === 0 && (
        <div className="text-center py-12">
          <FaEnvelope className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No contact messages</h3>
          <p className="mt-1 text-sm text-gray-500">No contact messages have been received yet.</p>
        </div>
      )}
    </div>
  )
}