import { Song } from '../models/Song.js';
import { Album } from '../models/Album.js';
import cloudinary from '../lib/cloudinary.js';

// Helper function to upload file to Cloudinary
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto' // auto-detect the file type OPTION
    });
    return result.secure_url; // returns the uploaded URL to save in our DB
  } catch (error) {
    console.log('Error uploading to Cloudinary', error);
    throw new Error('File upload to Cloudinary failed');
  }
}

export const createSong = async (req, res, next) => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) { // if req.file is undefined or other files are missing
      return res.status(400).json({ message: 'Please upload all required files' });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    // Upload audio file to Cloudinary
    const audioUrl = await uploadToCloudinary(audioFile);
    // Upload image file to Cloudinary
    const imageUrl = await uploadToCloudinary(imageFile);

    // Create the new song
    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null
    });
    // Save the song
    await song.save();
    // If the song is also in an album, add the song to the album's songs array
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
          $push: { songs: song._id }
        });
    }
    // 201 means resource has been created
    res.status(201).json({ message: 'Song created successfully', song });
  } catch (error) {
    console.log('Error in createSong', error);
    next(error);
  }
};

export const deleteSong = async (req, res, next) => {
  try {
    const { songId } = req.params;

    const song = await Song.findById(songId);

    // check if song exists
    if (!song) {
      return res.status(404).json({ message: 'Song not found' });
    }

    // if song belongs to album
    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id }
      });
    }

    await Song.findByIdAndDelete(songId);

    res.status(200).json({ message: 'Song deleted successfully' });

  } catch (error) {
    console.log('Error in deleteSong', error);
    next(error);
  }
};