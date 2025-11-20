import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaGem, FaTag, FaStar, FaHammer, FaImage } from 'react-icons/fa'
import gemstoneService from '../services/gemstoneService'

const CATEGORIES = ['precious', 'semi-precious', 'organic']
const QUALITIES = ['affordable', 'commercial', 'luxury']

export default function GemstoneForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    nameKey: '',
    category: 'precious',
    quality: 'affordable',
    hardness: '',
    image: null
  })

  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fetchLoading, setFetchLoading] = useState(isEditing)

  const fetchGemstone = useCallback(async () => {
    try {
      setFetchLoading(true)
      const gemstone = await gemstoneService.getById(id)
      setFormData({
        nameKey: gemstone.nameKey || '',
        category: gemstone.category || 'precious',
        quality: gemstone.quality || 'affordable',
        hardness: gemstone.hardness || '',
        image: null // Don't set the image file for editing, keep it as URL
      })
      setCurrentImageUrl(gemstone.image || '')
    } catch (err) {
      setError('Failed to fetch gemstone')
      console.error('Error fetching gemstone:', err)
    } finally {
      setFetchLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (isEditing) {
      fetchGemstone()
    }
  }, [isEditing, fetchGemstone])

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target

    if (type === 'file' && files) {
      setFormData(prev => ({
        ...prev,
        [name]: files[0] || null
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validate image for new gemstones
    if (!isEditing && !formData.image) {
      setError('Please select an image file')
      setLoading(false)
      return
    }

    try {
      if (isEditing) {
        await gemstoneService.update(id, formData)
      } else {
        await gemstoneService.create(formData)
      }
      navigate('/')
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} gemstone`)
      console.error('Error saving gemstone:', err)
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {isEditing ? 'Edit Gemstone' : 'New Gemstone'}
                </h1>
              </div>
              <button
                type="button"
                onClick={() => navigate('/')}
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
              <div>
                <label htmlFor="nameKey" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaGem className="mr-2 text-emerald-600" />
                  Name Key *
                </label>
                <input
                  type="text"
                  name="nameKey"
                  id="nameKey"
                  required
                  value={formData.nameKey}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="e.g., Diamond"
                />
              </div>

              <div>
                <label htmlFor="category" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaTag className="mr-2 text-blue-600" />
                  Category *
                </label>
                <select
                  name="category"
                  id="category"
                  required
                  value={formData.category}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900 bg-white"
                >
                  {CATEGORIES.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="quality" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaStar className="mr-2 text-yellow-600" />
                  Quality *
                </label>
                <select
                  name="quality"
                  id="quality"
                  required
                  value={formData.quality}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition duration-200 text-gray-900 bg-white"
                >
                  {QUALITIES.map(quality => (
                    <option key={quality} value={quality}>
                      {quality.charAt(0).toUpperCase() + quality.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="hardness" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaHammer className="mr-2 text-gray-600" />
                  Hardness *
                </label>
                <input
                  type="text"
                  name="hardness"
                  id="hardness"
                  required
                  value={formData.hardness}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="e.g., 10 (Mohs scale)"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="image" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaImage className="mr-2 text-pink-600" />
                  Gemstone Image *
                </label>
                {isEditing && currentImageUrl && (
                  <div className="mt-3 mb-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-sm font-medium text-gray-700 mb-3">Current Image:</p>
                    <img
                      src={currentImageUrl}
                      alt="Current gemstone"
                      className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-cover rounded-lg shadow-md border-4 border-white"
                    />
                  </div>
                )}
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-emerald-400 transition-colors duration-200">
                  <div className="space-y-1 text-center">
                    <FaImage className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="image"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-emerald-600 hover:text-emerald-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-emerald-500"
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
                  {isEditing ? 'Upload a new image to replace the current one (optional)' : 'Select an image file for the gemstone'}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition duration-200 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 order-1 sm:order-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <FaSave className="mr-2" />
                )}
                {isEditing ? 'Update Gemstone' : 'Create Gemstone'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}