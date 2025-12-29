import { Song } from "../models/song.model.js";

export const getAllSongs = async (req, res) => {
  try {
    const songs = await Song.find().sort({ createdAt: -1 }); // sort by creation date descending - newest first
    res.json(songs);
  } catch (error) {
    next(error);    
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 6 } },
      { $project: 
        { _id: 1, 
          title: 1,
          artist: 1, 
          imageUrl: 1,
          audioUrl: 1
        }  
      }
    ]); // get 6 random songs

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

// Made For You and Trending can have same logic for now, later we can improve it based on user preferences and song popularity
// This may require machine learning algorithms or more complex data analysis
export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      { $project: 
        { _id: 1, 
          title: 1,
          artist: 1, 
          imageUrl: 1,
          audioUrl: 1
        }  
      }
    ]); // get 6 random songs

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      { $sample: { size: 4 } },
      { $project: 
        { _id: 1, 
          title: 1,
          artist: 1, 
          imageUrl: 1,
          audioUrl: 1
        }  
      }
    ]); // get 6 random songs

    res.json(songs);
  } catch (error) {
    next(error);
  }
};