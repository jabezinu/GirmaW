import Video from '../models/Video.js';

// Get all videos
export const getAllVideos = async function(req, res) {
  try {
    const { sort } = req.query;
    let sortOption = {};

    if (sort === '-createdAt') {
      sortOption = { createdAt: -1 }; // Newest first
    }

    const videos = await Video.find().sort(sortOption);
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single video
export const getVideoById = async function(req, res) {
  try {
    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create video
export const createVideo = async function(req, res) {
  try {
    const video = new Video(req.body);
    const newVideo = await video.save();
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update video
export const updateVideo = async function(req, res) {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json(video);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete video
export const deleteVideo = async function(req, res) {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) {
      return res.status(404).json({ message: 'Video not found' });
    }
    res.json({ message: 'Video deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default { getAllVideos, getVideoById, createVideo, updateVideo, deleteVideo };