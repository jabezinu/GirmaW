import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import gemstoneService from '../services/gemstoneService'

export default function GemstonesList() {
  const [gemstones, setGemstones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchGemstones()
  }, [])

  const fetchGemstones = async () => {
    try {
      setLoading(true)
      const data = await gemstoneService.getAll()
      setGemstones(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch gemstones')
      console.error('Error fetching gemstones:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gemstone?')) {
      try {
        await gemstoneService.delete(id)
        setGemstones(gemstones.filter(gemstone => gemstone._id !== id))
      } catch (err) {
        setError('Failed to delete gemstone')
        console.error('Error deleting gemstone:', err)
      }
    }
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
          onClick={fetchGemstones}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Gemstones</h1>
            <p className="text-gray-600">
              Manage your gemstone inventory and showcase your collection
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/gemstones/new"
              className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200 transform hover:scale-105"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Add Gemstone
            </Link>
          </div>
        </div>
      </div>

      {/* Gemstones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {gemstones.map((gemstone) => (
          <div key={gemstone._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden group">
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={gemstone.image}
                alt={gemstone.nameKey}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 right-3">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm ${
                  gemstone.category === 'precious'
                    ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                    : gemstone.category === 'semi-precious'
                    ? 'bg-blue-100 text-blue-800 border border-blue-200'
                    : 'bg-green-100 text-green-800 border border-green-200'
                }`}>
                  {gemstone.category}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-emerald-700 transition-colors">
                {gemstone.nameKey}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Quality</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    gemstone.quality === 'luxury'
                      ? 'bg-purple-100 text-purple-800'
                      : gemstone.quality === 'commercial'
                      ? 'bg-indigo-100 text-indigo-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {gemstone.quality}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Hardness</span>
                  <span className="text-sm font-medium text-gray-900">{gemstone.hardness}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                <Link
                  to={`/gemstones/${gemstone._id}/edit`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg hover:bg-emerald-100 hover:border-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
                >
                  <FaEdit className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(gemstone._id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  <FaTrash className="mr-1.5 h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {gemstones.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPlus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No gemstones yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first gemstone to the collection.</p>
          <Link
            to="/gemstones/new"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-200"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            Add your first gemstone
          </Link>
        </div>
      )}
    </div>
  )
}