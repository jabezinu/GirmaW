import { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import gemstoneService from '../services/gemstoneService'
import courseService from '../services/courseService'
import equipmentService from '../services/equipmentService'
import videoService from '../services/videoService'
import contactMessageService from '../services/contactMessageService'
import { createNotificationSound, playNotificationAudio } from '../utils/notificationSound'

const DataContext = createContext(null)

// Global ref to store clearCache function for use outside of React context
let globalClearCache = null

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within DataProvider')
  }
  return context
}

// Export function to clear cache from anywhere
export const clearDataCache = () => {
  if (globalClearCache) {
    globalClearCache()
  }
}

export const DataProvider = ({ children }) => {
  // State for each data type
  const [gemstones, setGemstones] = useState([])
  const [courses, setCourses] = useState([])
  const [equipments, setEquipments] = useState([])
  const [videos, setVideos] = useState([])
  const [contactMessages, setContactMessages] = useState([])

  // Loading states
  const [gemstonesLoading, setGemstonesLoading] = useState(false)
  const [coursesLoading, setCoursesLoading] = useState(false)
  const [equipmentsLoading, setEquipmentsLoading] = useState(false)
  const [videosLoading, setVideosLoading] = useState(false)
  const [contactMessagesLoading, setContactMessagesLoading] = useState(false)

  // Cache flags to track if data has been fetched
  const [gemstonesCached, setGemstonesCached] = useState(false)
  const [coursesCached, setCoursesCached] = useState(false)
  const [equipmentsCached, setEquipmentsCached] = useState(false)
  const [videosCached, setVideosCached] = useState(false)
  const [contactMessagesCached, setContactMessagesCached] = useState(false)

  // Track previous unread message count for notification
  const previousUnreadCountRef = useRef(null)
  const notificationAudioRef = useRef(null)

  // Gemstones
  const fetchGemstones = useCallback(async (force = false) => {
    if (gemstonesCached && !force) return gemstones
    
    try {
      setGemstonesLoading(true)
      const data = await gemstoneService.getAll()
      setGemstones(data)
      setGemstonesCached(true)
      return data
    } catch (error) {
      console.error('Error fetching gemstones:', error)
      throw error
    } finally {
      setGemstonesLoading(false)
    }
  }, [gemstonesCached, gemstones])

  const addGemstone = useCallback((gemstone) => {
    setGemstones(prev => [...prev, gemstone])
  }, [])

  const updateGemstone = useCallback((id, updatedGemstone) => {
    setGemstones(prev => prev.map(g => g._id === id ? updatedGemstone : g))
  }, [])

  const deleteGemstone = useCallback((id) => {
    setGemstones(prev => prev.filter(g => g._id !== id))
  }, [])

  // Courses
  const fetchCourses = useCallback(async (force = false) => {
    if (coursesCached && !force) return courses
    
    try {
      setCoursesLoading(true)
      const data = await courseService.getAll()
      setCourses(data)
      setCoursesCached(true)
      return data
    } catch (error) {
      console.error('Error fetching courses:', error)
      throw error
    } finally {
      setCoursesLoading(false)
    }
  }, [coursesCached, courses])

  const addCourse = useCallback((course) => {
    setCourses(prev => [...prev, course])
  }, [])

  const updateCourse = useCallback((id, updatedCourse) => {
    setCourses(prev => prev.map(c => c._id === id ? updatedCourse : c))
  }, [])

  const deleteCourse = useCallback((id) => {
    setCourses(prev => prev.filter(c => c._id !== id))
  }, [])

  // Equipments
  const fetchEquipments = useCallback(async (force = false) => {
    if (equipmentsCached && !force) return equipments
    
    try {
      setEquipmentsLoading(true)
      const data = await equipmentService.getAll()
      setEquipments(data)
      setEquipmentsCached(true)
      return data
    } catch (error) {
      console.error('Error fetching equipments:', error)
      throw error
    } finally {
      setEquipmentsLoading(false)
    }
  }, [equipmentsCached, equipments])

  const addEquipment = useCallback((equipment) => {
    setEquipments(prev => [...prev, equipment])
  }, [])

  const updateEquipment = useCallback((id, updatedEquipment) => {
    setEquipments(prev => prev.map(e => e._id === id ? updatedEquipment : e))
  }, [])

  const deleteEquipment = useCallback((id) => {
    setEquipments(prev => prev.filter(e => e._id !== id))
  }, [])

  // Videos
  const fetchVideos = useCallback(async (force = false) => {
    if (videosCached && !force) return videos
    
    try {
      setVideosLoading(true)
      const data = await videoService.getAll()
      setVideos(data)
      setVideosCached(true)
      return data
    } catch (error) {
      console.error('Error fetching videos:', error)
      throw error
    } finally {
      setVideosLoading(false)
    }
  }, [videosCached, videos])

  const addVideo = useCallback((video) => {
    setVideos(prev => [...prev, video])
  }, [])

  const updateVideo = useCallback((id, updatedVideo) => {
    setVideos(prev => prev.map(v => v._id === id ? updatedVideo : v))
  }, [])

  const deleteVideo = useCallback((id) => {
    setVideos(prev => prev.filter(v => v._id !== id))
  }, [])

  // Contact Messages
  const fetchContactMessages = useCallback(async (force = false) => {
    if (contactMessagesCached && !force) return contactMessages
    
    try {
      setContactMessagesLoading(true)
      const data = await contactMessageService.getAll()
      
      // Check for new unread messages and play notification sound
      const newUnreadCount = data.filter(m => !m.read).length
      
      // Only play sound if we have a previous count and the new count is higher
      if (previousUnreadCountRef.current !== null && newUnreadCount > previousUnreadCountRef.current) {
        playNotificationSound()
      }
      
      // Update the previous count
      previousUnreadCountRef.current = newUnreadCount
      
      setContactMessages(data)
      setContactMessagesCached(true)
      return data
    } catch (error) {
      console.error('Error fetching contact messages:', error)
      throw error
    } finally {
      setContactMessagesLoading(false)
    }
  }, [contactMessagesCached, contactMessages])

  // Function to play notification sound
  const playNotificationSound = useCallback(() => {
    // Try to play audio file first, with fallback to generated sound
    playNotificationAudio(notificationAudioRef)
  }, [])

  const updateContactMessage = useCallback((id, updates) => {
    setContactMessages(prev => prev.map(m => m._id === id ? { ...m, ...updates } : m))
  }, [])

  const deleteContactMessage = useCallback((id) => {
    setContactMessages(prev => prev.filter(m => m._id !== id))
  }, [])

  // Clear all cache (useful for logout or manual refresh)
  const clearCache = useCallback(() => {
    setGemstonesCached(false)
    setCoursesCached(false)
    setEquipmentsCached(false)
    setVideosCached(false)
    setContactMessagesCached(false)
  }, [])

  // Set global clearCache reference
  useEffect(() => {
    globalClearCache = clearCache
    return () => {
      globalClearCache = null
    }
  }, [clearCache])

  // Poll for new contact messages every 10 seconds
  useEffect(() => {
    // Initial fetch to set the baseline
    if (!contactMessagesCached) {
      fetchContactMessages()
    }

    // Set up polling interval
    const pollInterval = setInterval(() => {
      // Force fetch to get latest messages
      fetchContactMessages(true)
    }, 10000) // Poll every 10 seconds

    return () => {
      clearInterval(pollInterval)
    }
  }, [fetchContactMessages, contactMessagesCached])

  const value = {
    // Gemstones
    gemstones,
    gemstonesLoading,
    fetchGemstones,
    addGemstone,
    updateGemstone,
    deleteGemstone,
    
    // Courses
    courses,
    coursesLoading,
    fetchCourses,
    addCourse,
    updateCourse,
    deleteCourse,
    
    // Equipments
    equipments,
    equipmentsLoading,
    fetchEquipments,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    
    // Videos
    videos,
    videosLoading,
    fetchVideos,
    addVideo,
    updateVideo,
    deleteVideo,
    
    // Contact Messages
    contactMessages,
    contactMessagesLoading,
    fetchContactMessages,
    updateContactMessage,
    deleteContactMessage,
    
    // Utility
    clearCache
  }

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  )
}
