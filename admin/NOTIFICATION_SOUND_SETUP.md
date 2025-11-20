# Notification Sound Setup

## Overview
The admin panel now automatically plays a notification sound when new messages are received from clients.

## How It Works

1. **Automatic Polling**: The system checks for new messages every 10 seconds
2. **Sound Notification**: When a new unread message is detected, a notification sound plays immediately
3. **Fallback System**: If the audio file is not available, a generated beep sound plays instead

## Adding a Custom Notification Sound (Optional)

The system works out-of-the-box with a generated beep sound. To use a custom sound:

1. Download or create a notification sound file (MP3 format recommended)
2. Name it `notification.mp3`
3. Place it in the `admin/public/` folder

### Recommended Sound Sources:
- **Freesound.org** - Free sound effects library
- **Zapsplat.com** - Free sound effects
- **Notification Sounds** - Search for "notification" or "alert" sounds

### Sound Recommendations:
- Duration: 1-2 seconds
- Volume: Moderate (not too loud)
- Type: Pleasant chime, bell, or beep

## Testing

1. Start the admin panel: `npm run dev`
2. Have someone submit a message through the client contact form
3. Wait up to 10 seconds - you should hear the notification sound
4. The message will appear in the Contact Messages list

## Configuration

To adjust the polling interval, edit `admin/src/contexts/DataContext.jsx`:

```javascript
const pollInterval = setInterval(() => {
  fetchContactMessages(true)
}, 10000) // Change 10000 to desired milliseconds (e.g., 5000 = 5 seconds)
```

## Troubleshooting

**No sound playing?**
- Check browser console for errors
- Ensure browser allows audio playback (some browsers block autoplay)
- Try clicking anywhere on the page first (browsers require user interaction for audio)
- The fallback generated sound should work even without the MP3 file

**Sound plays multiple times?**
- This is expected if multiple new messages arrive
- Each new unread message triggers one notification sound
