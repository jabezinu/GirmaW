import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaCogs, FaDollarSign, FaFileAlt, FaImage } from 'react-icons/fa'
import equipmentService from '../services/equipmentService'

export default function EquipmentForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: null
  })

  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fetchLoading, setFetchLoading] = useState(isEditing)

  const fetchEquipment = useCallback(async () => {
    try {
      setFetchLoading(true)
      const equipment = await equipmentService.getById(id)
      setFormData({
        name: equipment.name || '',
        description: equipment.description || '',
        price: equipment.price || '',
        image: null // Don't set the image file for editing, keep it as URL
      })
      setCurrentImageUrl(equipment.image || '')
    } catch (err) {
      setError('Failed to fetch equipment')
      console.error('Error fetching equipment:', err)
    } finally {
      setFetchLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (isEditing) {
      fetchEquipment()
    }
  }, [isEditing, fetchEquipment])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === 'image') {
      setFormData(prev => ({
        ...prev,
        [name]: files[0]
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate image for new equipments
    if (!isEditing && !formData.image) {
      setError('Please select an image file')
      setLoading(false)
      return
    }

    try {
      if (isEditing) {
        await equipmentService.update(id, formData)
      } else {
        await equipmentService.create(formData)
      }
      navigate('/equipments')
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} equipment`)
      console.error('Error saving equipment:', err)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-orange-600 to-amber-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {isEditing ? 'Edit Equipment' : 'Add New Equipment'}
                </h1>
              </div>
              <button
                type="button"
                onClick={() => navigate('/equipments')}
                className="inline-flex items-center px-4 py-2 border border-white/20 rounded-lg text-white hover:bg-white/10 transition-colors duration-200 self-start sm:self-auto"
              >
                <FaArrowLeft className="mr-2" />
                Back
              </button>
            </div>
          </div>

          {error && (
            <div className="mx-6 mt-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="px-6 py-8 space-y-8">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaCogs className="mr-2 text-orange-600" />
                  Equipment Name *
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="Enter equipment name"
                />
              </div>

              <div>
                <label htmlFor="price" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaDollarSign className="mr-2 text-yellow-600" />
                  Price *
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  required
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="e.g., $299"
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200 text-gray-900 placeholder-gray-500"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaFileAlt className="mr-2 text-amber-600" />
                  Description *
                </label>
                <textarea
                  name="description"
                  id="description"
                  required
                  rows={5}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition duration-200 text-gray-900 placeholder-gray-500 resize-vertical"
                  placeholder="Describe the equipment specifications, features, and usage..."
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="image" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaImage className="mr-2 text-pink-600" />
                  Equipment Image *
                </label>
                {isEditing && currentImageUrl && (
                  <div className="mt-3 mb-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-sm font-medium text-gray-700 mb-3">Current Image:</p>
                    <img
                      src={currentImageUrl}
                      alt="Current equipment"
                      className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-cover rounded-lg shadow-md border-4 border-white"
                    />
                  </div>
                )}
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-400 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="image"
                          name="image"
                          type="file"
                          accept="image/*"
                          required={!isEditing}
                          onChange={handleChange}
                          className="sr-only"
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {isEditing ? 'Upload a new image to replace the current one (optional)' : 'Select an image file for the equipment'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/equipments')}
                className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition duration-200 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:from-orange-700 hover:to-amber-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 order-1 sm:order-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <FaSave className="mr-2" />
                )}
                {isEditing ? 'Update Equipment' : 'Create Equipment'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}