import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useModal } from '../contexts/ModalContext'
import equipmentService from '../services/equipmentService'

export default function EquipmentsList() {
  const [equipments, setEquipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { showConfirm } = useModal()

  useEffect(() => {
    fetchEquipments()
  }, [])

  const fetchEquipments = async () => {
    try {
      setLoading(true)
      const data = await equipmentService.getAll()
      setEquipments(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch equipments')
      toast.error('Failed to fetch equipments')
      console.error('Error fetching equipments:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    const confirmed = await showConfirm('Are you sure you want to delete this equipment?', 'Delete Equipment')
    if (confirmed) {
      try {
        await equipmentService.delete(id)
        setEquipments(equipments.filter(equipment => equipment._id !== id))
        toast.success('Equipment deleted successfully')
      } catch (err) {
        setError('Failed to delete equipment')
        toast.error('Failed to delete equipment')
        console.error('Error deleting equipment:', err)
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
          onClick={fetchEquipments}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Equipment</h1>
            <p className="text-gray-600">
              Manage your equipment inventory and tools
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/equipments/new"
              className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200 transform hover:scale-105"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Add Equipment
            </Link>
          </div>
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {equipments.map((equipment) => (
          <div key={equipment._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden group">
            {/* Image Section */}
            <div className="relative overflow-hidden">
              <img
                src={equipment.image}
                alt={equipment.name}
                className="w-full h-32 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Content Section */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-orange-700 transition-colors">
                {equipment.name}
              </h3>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">Price</span>
                  <span className="text-sm font-medium text-gray-900">{equipment.price}</span>
                </div>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{equipment.description}</p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Link
                  to={`/equipments/${equipment._id}/edit`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-orange-700 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100 hover:border-orange-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
                >
                  <FaEdit className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(equipment._id)}
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
      {equipments.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPlus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No equipment yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first piece of equipment.</p>
          <Link
            to="/equipments/new"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-orange-600 to-amber-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-all duration-200"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            Add your first equipment
          </Link>
        </div>
      )}
    </div>
  )
}