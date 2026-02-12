import {create} from 'zustand';
import type { Song } from '@/types';

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  queue: Song[];
  currentIndex: number;

  initialiseQueue: (songs: Song[]) => void;
  // ? makes startIndex optional
  playAlbum: (songs: Song[], startIndex?: number) => void;
  setCurrentSong: (song: Song | null) => void;
  togglePlay: () => void;
  playNext: () => void;
  playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
  currentSong: null,
  isPlaying: false,
  queue: [],
  currentIndex: -1,
  
  initialiseQueue: (songs: Song[]) => {
    set({
      queue: songs,
      currentSong: get().currentSong || songs[0] || null,
      currentIndex: get().currentIndex === -1 ? 0 : get().currentIndex,
    })
  },
  
  playAlbum: (songs: Song[], startIndex = 0) => {
    if(songs.length <= 0) return;

    const song = songs[startIndex] || songs[0];

    set({
      queue: songs,
      currentSong: song,
      currentIndex: startIndex,
      isPlaying: true,
    })

  },

  setCurrentSong: (song: Song | null) => {
    if (!song) return;
 
    const songIndex = get().queue.findIndex(s => s._id === song._id);

    set({
      currentSong: song,
      isPlaying: true,
      // If song not found in queue, keep currentIndex unchanged
      // else set to found index
      currentIndex: songIndex >= 0 ? songIndex : get().currentIndex,
    });
  },

  togglePlay: () => {
    // Negate the state
    const willStartPlaying = !get().isPlaying;
    set({
      isPlaying: willStartPlaying,
    })
  },

  playNext: () => {

    const { currentIndex, queue } = get();
    const nextIndex = currentIndex + 1;

    // If there exists a next song play it
    if (nextIndex < queue.length) {
      const nextSong = queue[nextIndex];
      set({
        currentSong: nextSong,
        currentIndex: nextIndex,
        isPlaying: true,
      })
    } else { // No next song, stop playing
      set({
        isPlaying: false,
      })
    }

  },
  
  playPrevious: () => {

    const { currentIndex, queue } = get();
    const prevIndex = currentIndex - 1;

    // If there exists a previous song play it
    if (prevIndex >= 0) {
      const prevSong = queue[prevIndex];
      set({
        currentSong: prevSong,
        currentIndex: prevIndex,
        isPlaying: true,
      })
    } else {
      set({
        isPlaying: false,
      })
    }
  },

}));