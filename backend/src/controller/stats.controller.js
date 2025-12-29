import { Song } from '../models/song.model.js';
import { User } from '../models/user.model.js';
import { Album } from '../models/album.model.js';

export const getStats = async(res, req, next) => {
  try {
    const [totalSongs, totalUsers, totalAlbums, totalUniqueArtists] = await Promise.all([
      Song.countDocuments(),
      User.countDocuments(),
      Album.countDocuments(),
        
      // Fetch all the songs and albums and combine them, group them by unique artist names and count them
      Song.aggregate([
        {
          $unionWith:{
            coll: 'albums',
            pipeline: []
          }
        },
        {
          $group: {
            _id: '$artist'
          }
        },
        {
          $count: 'count'
        }
      ])
    ]);

    res.statusCode(200).json({
      totalSongs,
      totalUsers,
      totalAlbums,
      totalUniqueArtists: totalUniqueArtists[0] ? totalUniqueArtists[0].count : 0
    });
  } catch (error) {
    next(error);
  }
}