import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaEdit, FaTrash, FaPlus, FaPlay } from 'react-icons/fa'
import { toast } from 'react-toastify'
import videoService from '../services/videoService'

export default function VideosList() {
  const [videos, setVideos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  useEffect(() => {
    fetchVideos()
  }, [])

  const fetchVideos = async () => {
    try {
      setLoading(true)
      const data = await videoService.getAll()
      setVideos(data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch videos')
      toast.error('Failed to fetch videos')
      console.error('Error fetching videos:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this video?')) {
      try {
        await videoService.delete(id)
        setVideos(videos.filter(video => video._id !== id))
        toast.success('Video deleted successfully')
      } catch (err) {
        setError('Failed to delete video')
        toast.error('Failed to delete video')
        console.error('Error deleting video:', err)
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
          onClick={fetchVideos}
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Videos</h1>
            <p className="text-gray-600">
              Manage your video testimonials and showcase customer experiences
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link
              to="/videos/new"
              className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200 transform hover:scale-105"
            >
              <FaPlus className="mr-2 h-4 w-4" />
              Add Video
            </Link>
          </div>
        </div>
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <div key={video._id} className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg hover:border-gray-300 transition-all duration-300 overflow-hidden group">
            {/* Video Preview */}
            <div className="relative overflow-hidden bg-gray-100">
              <div className="aspect-video">
                <iframe
                  src={getEmbedUrl(video.url)}
                  frameBorder="0"
                  allowFullScreen
                  className="w-full h-full rounded-t-xl"
                  title={video.title}
                ></iframe>
              </div>
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium shadow-sm bg-purple-100 text-purple-800 border border-purple-200">
                  Video
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
                {video.title}
              </h3>

              {video.description && (
                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                  {video.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Link
                  to={`/videos/${video._id}/edit`}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-purple-700 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
                >
                  <FaEdit className="mr-1.5 h-3.5 w-3.5" />
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(video._id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 text-sm font-medium text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200"
                >
                  <FaTrash className="mr-1.5 h-3.5 w-3.5" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {videos.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaPlus className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No videos yet</h3>
          <p className="text-gray-500 mb-6">Get started by adding your first video testimonial to the collection.</p>
          <Link
            to="/videos/new"
            className="inline-flex items-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg shadow-sm hover:from-purple-700 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-200"
          >
            <FaPlus className="mr-2 h-4 w-4" />
            Add your first video
          </Link>
        </div>
      )}
    </div>
  )
}