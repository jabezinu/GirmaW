import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave, FaArrowLeft, FaVideo, FaHeading, FaLink, FaFileAlt } from 'react-icons/fa'
import { toast } from 'react-toastify'
import videoService from '../services/videoService'

export default function VideoForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditing = !!id

  const [formData, setFormData] = useState({
    title: '',
    url: '',
    description: ''
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [fetchLoading, setFetchLoading] = useState(isEditing)

  // Function to convert video URLs to embed format
  const getEmbedUrl = (url) => {
    if (!url) return '';

    // TikTok embed
    if (url.includes('tiktok.com')) {
      const match = url.match(/\/video\/(\d+)/);
      if (match) {
        return `https://www.tiktok.com/embed/v2/${match[1]}?hide_related=1`;
      }
    }

    // YouTube embed
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      let videoId = '';
      if (url.includes('youtube.com/watch?v=')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
    }

    // If it's already an embed URL, return as is
    if (url.includes('/embed/') || url.includes('embed/v2/')) {
      return url;
    }

    // Fallback: return original URL
    return url;
  };

  const fetchVideo = useCallback(async () => {
    try {
      setFetchLoading(true)
      const video = await videoService.getById(id)
      setFormData({
        title: video.title || '',
        url: video.url || '',
        description: video.description || ''
      })
    } catch (err) {
      setError('Failed to fetch video')
      toast.error('Failed to fetch video')
      console.error('Error fetching video:', err)
    } finally {
      setFetchLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (isEditing) {
      fetchVideo()
    }
  }, [isEditing, fetchVideo])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Basic URL validation
    try {
      new URL(formData.url)
    } catch {
      setError('Please enter a valid URL')
      setLoading(false)
      return
    }

    try {
      if (isEditing) {
        await videoService.update(id, formData)
        toast.success('Video updated successfully')
      } else {
        await videoService.create(formData)
        toast.success('Video created successfully')
      }
      navigate('/videos')
    } catch (err) {
      setError(`Failed to ${isEditing ? 'update' : 'create'} video`)
      toast.error(`Failed to ${isEditing ? 'update' : 'create'} video`)
      console.error('Error saving video:', err)
    } finally {
      setLoading(false)
    }
  }

  if (fetchLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-6 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {isEditing ? 'Edit Video' : 'New Video'}
                </h1>
              </div>
              <button
                type="button"
                onClick={() => navigate('/videos')}
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
                <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaHeading className="mr-2 text-purple-600" />
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="e.g., Customer Testimonial Video"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="url" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaLink className="mr-2 text-blue-600" />
                  Video URL *
                </label>
                <input
                  type="url"
                  name="url"
                  id="url"
                  required
                  value={formData.url}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-gray-900 placeholder-gray-500"
                  placeholder="https://www.tiktok.com/@user/video/123456789 or https://www.youtube.com/watch?v=..."
                />
                <p className="mt-2 text-sm text-gray-600">
                  Enter the full video URL (TikTok, YouTube, etc.). The system will automatically convert it to embed format.
                </p>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="description" className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                  <FaFileAlt className="mr-2 text-green-600" />
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className="block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition duration-200 text-gray-900 placeholder-gray-500 resize-vertical"
                  placeholder="Optional description for the video..."
                />
              </div>

              {/* Video Preview */}
              {formData.url && (
                <div className="sm:col-span-2">
                  <label className="flex items-center text-sm font-semibold text-gray-800 mb-2">
                    <FaVideo className="mr-2 text-purple-600" />
                    Video Preview
                  </label>
                  <div className="bg-gray-50 border-2 border-gray-200 border-dashed rounded-lg p-4">
                    <div className="aspect-video w-full max-w-md mx-auto">
                      <iframe
                        src={formData.url.includes('/embed/') || formData.url.includes('embed/v2/') ? formData.url : getEmbedUrl(formData.url)}
                        frameBorder="0"
                        allowFullScreen
                        className="w-full h-full rounded-lg"
                        title="Video Preview"
                      ></iframe>
                    </div>
                    <p className="text-xs text-gray-500 text-center mt-2">
                      Preview of how the video will appear on the homepage
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-4 sm:space-y-0 sm:space-x-4 pt-8 border-t border-gray-200">
              <button
                type="button"
                onClick={() => navigate('/videos')}
                className="px-6 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200 order-1 sm:order-2"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                ) : (
                  <FaSave className="mr-2" />
                )}
                {isEditing ? 'Update Video' : 'Create Video'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}