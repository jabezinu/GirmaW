import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaGem, FaTag, FaStar, FaHammer, FaImage, FaBook, FaPlus, FaTrash, FaImages } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useData } from '../contexts/DataContext'
import gemstoneService from '../services/gemstoneService'

const CATEGORIES = ['precious', 'semi-precious', 'organic']
const QUALITIES = ['affordable', 'commercial', 'luxury']

export default function GemstoneForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id
  const { addGemstone, updateGemstone } = useData()

  const [formData, setFormData] = useState({
    nameKey: '',
    category: 'precious',
    quality: 'affordable',
    hardness: '',
    image: null,           // Main image (shown on card + detail modal)
    galleryImages: []      // New detail images to upload
  })

  const [detailSections, setDetailSections] = useState([])
  const [currentImageUrl, setCurrentImageUrl] = useState('')
  const [existingGalleryImages, setExistingGalleryImages] = useState([]) // Existing images from database
  const [imagesToRemove, setImagesToRemove] = useState([]) // URLs of images to remove
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
        image: null,
        galleryImages: []
      })
      setCurrentImageUrl(gemstone.image || '')
      setExistingGalleryImages(gemstone.galleryImages || [])
      setImagesToRemove([])
      setDetailSections(gemstone.detailSections || [])
    } catch (err) {
      setError('Failed to fetch gemstone')
      toast.error('Failed to fetch gemstone')
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
      if (name === 'galleryImages') {
        // For gallery images, append new files to existing ones
        setFormData(prev => ({
          ...prev,
          [name]: [...prev.galleryImages, ...Array.from(files)]
        }))
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: files[0] || null
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
      }))
    }
  }

  const handleRemoveExistingImage = (imageUrl) => {
    setExistingGalleryImages(prev => prev.filter(img => img !== imageUrl))
    setImagesToRemove(prev => [...prev, imageUrl])
  }

  const handleRemoveNewImage = (index) => {
    setFormData(prev => ({
      ...prev,
      galleryImages: prev.galleryImages.filter((_, i) => i !== index)
    }))
  }

  const handleAddSection = () => {
    setDetailSections([...detailSections, { title: '', content: '' }])
  }

  const handleRemoveSection = (index) => {
    setDetailSections(detailSections.filter((_, i) => i !== index))
  }

  const handleSectionChange = (index, field, value) => {
    const newSections = [...detailSections]
    newSections[index][field] = value
    setDetailSections(newSections)
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
      // Create FormData for file uploads
      const submitData = new FormData()
      submitData.append('nameKey', formData.nameKey)
      submitData.append('category', formData.category)
      submitData.append('quality', formData.quality)
      submitData.append('hardness', formData.hardness)

      // Main image (shown on card and as first image in detail modal)
      if (formData.image) submitData.append('image', formData.image)
      
      // Detail images (additional images shown in detail modal gallery)
      if (formData.galleryImages && formData.galleryImages.length > 0) {
        formData.galleryImages.forEach((file) => {
          submitData.append('galleryImages', file)
        })
      }

      // Send existing images to keep (excluding removed ones)
      if (existingGalleryImages.length > 0) {
        submitData.append('existingGalleryImages', JSON.stringify(existingGalleryImages))
      }

      // Send images to remove (for cleanup if needed)
      if (imagesToRemove.length > 0) {
        submitData.append('imagesToRemove', JSON.stringify(imagesToRemove))
      }
      if (detailSections.length > 0) {
        submitData.append('detailSections', JSON.stringify(detailSections))
      }

      if (isEditing) {
        const updatedGemstone = await gemstoneService.update(id, submitData)
        updateGemstone(id, updatedGemstone)
        toast.success('Gemstone updated successfully')
      } else {
        const newGemstone = await gemstoneService.create(submitData)
        addGemstone(newGemstone)
        toast.success('Gemstone created successfully')
      }
      navigate('/')
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} gemstone`)
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} gemstone`)
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
            {/* Basic Fields */}
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

              {/* Main Image - Shown on card AND as first image in detail modal */}
              <div className="sm:col-span-2">
                <label htmlFor="image" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaImage className="mr-2 text-pink-600" />
                  Main Image * <span className="ml-2 text-xs font-normal text-gray-500">(Displayed on card & detail view)</span>
                </label>
                <div className="bg-pink-50 border border-pink-200 rounded-lg p-3 mb-3">
                  <p className="text-sm text-pink-700">
                    <strong>📌 This image will be:</strong>
                    <br />• Shown on the gemstone card in the collection
                    <br />• Displayed as the main/first image when viewing details
                  </p>
                </div>
                {isEditing && currentImageUrl && (
                  <div className="mt-3 mb-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <p className="text-sm font-medium text-gray-700 mb-3">Current Main Image:</p>
                    <img
                      src={currentImageUrl}
                      alt="Current gemstone"
                      className="h-24 w-24 sm:h-32 sm:w-32 md:h-40 md:w-40 object-cover rounded-lg shadow-md border-4 border-white"
                    />
                  </div>
                )}
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  required={!isEditing}
                  onChange={handleChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                />
                <p className="mt-2 text-sm text-gray-600">
                  {isEditing ? 'Upload a new image to replace the current one (optional)' : 'Select the main image for this gemstone'}
                </p>
              </div>

            </div>

            {/* Detail Images - Additional images shown in detail modal */}
            <div className="sm:col-span-2 pt-6 border-t border-gray-200">
              <label htmlFor="galleryImages" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                <FaImages className="mr-2 text-green-600" />
                Detail Images <span className="ml-2 text-xs font-normal text-gray-500">(Additional images for detail view)</span>
              </label>
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                <p className="text-sm text-green-700">
                  <strong>📸 These images will:</strong>
                  <br />• Appear in the image gallery when users click "View Details"
                  <br />• Be shown alongside the main image in a carousel/gallery
                  <br />• Allow users to see multiple angles and details of the gemstone
                </p>
              </div>
              {isEditing && existingGalleryImages.length > 0 && (
                <div className="mt-3 mb-4 p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                  <p className="text-sm font-medium text-gray-700 mb-3">Current Detail Images ({existingGalleryImages.length}):</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {existingGalleryImages.map((imageUrl, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={imageUrl}
                          alt={`Detail image ${index + 1}`}
                          className="h-20 w-20 object-cover rounded-lg shadow-md border-4 border-white"
                        />
                        <span className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs text-center py-1 rounded-b-lg">
                          #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(imageUrl)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          title="Remove this image"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Click the X button on images to remove them. New images will be added to the existing ones.
                  </p>
                </div>
              )}

              {/* Show newly selected images */}
              {formData.galleryImages.length > 0 && (
                <div className="mt-3 mb-4 p-4 bg-blue-50 rounded-lg border-2 border-dashed border-blue-300">
                  <p className="text-sm font-medium text-blue-700 mb-3">New Images to Add ({formData.galleryImages.length}):</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {formData.galleryImages.map((file, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`New image ${index + 1}`}
                          className="h-20 w-20 object-cover rounded-lg shadow-md border-4 border-white"
                        />
                        <span className="absolute bottom-0 left-0 right-0 bg-blue-600 text-white text-xs text-center py-1 rounded-b-lg">
                          New #{index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveNewImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                          title="Remove this image"
                        >
                          <FaTrash className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <input
                id="galleryImages"
                name="galleryImages"
                type="file"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
              />
              <p className="mt-2 text-sm text-gray-600">
                Select multiple images to add to the detail view gallery. New images will be added to existing ones. Hold Ctrl/Cmd to select multiple files.
              </p>
            </div>

            {/* Detail Sections */}
            <div className="pt-6 border-t border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <label className="flex items-center text-lg font-semibold text-gray-800">
                  <FaBook className="mr-2 text-indigo-600" />
                  Detail Sections
                </label>
                <button
                  type="button"
                  onClick={handleAddSection}
                  className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  <FaPlus className="mr-2" />
                  Add Section
                </button>
              </div>

              {detailSections.length === 0 && (
                <p className="text-gray-600 text-sm mb-4">No detail sections yet. Click "Add Section" to create one.</p>
              )}

              {detailSections.map((section, index) => (
                <div key={index} className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-gray-800">Section {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveSection(index)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Title
                      </label>
                      <input
                        type="text"
                        value={section.title}
                        onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g., History"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Section Content
                      </label>
                      <textarea
                        value={section.content}
                        onChange={(e) => handleSectionChange(index, 'content', e.target.value)}
                        rows="4"
                        className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="Enter detailed description..."
                      />
                    </div>
                  </div>
                </div>
              ))}
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
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:from-emerald-700 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 order-1 sm:order-2 inline-flex items-center justify-center"
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