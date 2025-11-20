// Simple notification sound generator using Web Audio API
// This creates a pleasant notification beep without needing an external file

export const createNotificationSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()
    
    // Create oscillator for the beep sound
    const oscillator = audioContext.createOscillator()
    const gainNode = audioContext.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContext.destination)
    
    // Set frequency (higher = higher pitch)
    oscillator.frequency.value = 800
    oscillator.type = 'sine'
    
    // Set volume envelope (fade in and out)
    const now = audioContext.currentTime
    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(0.3, now + 0.01)
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3)
    
    // Play the sound
    oscillator.start(now)
    oscillator.stop(now + 0.3)
    
    return true
  } catch (error) {
    console.error('Error creating notification sound:', error)
    return false
  }
}

// Alternative: Play notification sound from audio file
export const playNotificationAudio = (audioRef) => {
  try {
    if (!audioRef.current) {
      audioRef.current = new Audio('/notification.mp3')
    }
    audioRef.current.currentTime = 0
    audioRef.current.play().catch(err => {
      console.error('Error playing notification audio:', err)
      // Fallback to generated sound if audio file fails
      createNotificationSound()
    })
  } catch (error) {
    console.error('Error playing notification audio:', error)
    // Fallback to generated sound
    createNotificationSound()
  }
}
