import { Button } from "@/components/ui/button";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Pause, Play, Shuffle, SkipBack } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const PlaybackControls = () => {

  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();

  // State for volume control (Intially set to 75)
  const { volume, setVolume } = useState(75);
  const { currentTime, setCurrentTime } = useState(0);
  const { duration, setDuration } = useState(0);
  // Take from AudioPlayer.tsx
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Selecting the single global <audio> element
    audioRef.current = document.querySelector('audio');

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    const updateDuration = () => {
      setDuration(audio.duration);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
    };

    // Song ends
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
    // Runs every time a new song is set
  },[currentSong])

  // Update the songs playback position
  const handleSeek = (value:number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  }

  return (
    <footer className="h-20 sm:h-24 bg-zinc-900 border-t border-zinc-800 px-4">
      <div className="flex justify-between items-center h-full max-w-450 mx-auto">
        {/* LHS currently playing song data */}

        <div className="hidden sm:flex iterms-center gap-4 min-w-45 w-[30%]">
          {currentSong && (
            <>
              {/* SONG IMAGE */}
              <img
                src={currentSong.imageUrl}
                alt={currentSong.title}
                className="w-14 h-14 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                {/* SONG TITLE */}
                <div className="font-medium truncate hover:underline cursor pointer">
                  {currentSong.title}
                </div>
                {/* SONG ARTIST */}
                <div className="text-sm text-zinc-400 truncate hover:underline cursor pointer">
                  {currentSong.artist}
                </div>
              </div>
            </>
          )}
        </div>

        {/* MIDDLE PLAYBACK CONTROLS */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Shuffle Button */}
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex hover:text-white text-zinc-400"
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            {/* Previous Button */}
            <Button
              size="icon"
              variant="ghost"
              className="hover:text-white text-zinc-400"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-white text-black hover:bg-white/80 w-8 h-8 rounded-full"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" fill="black" />
              ) : (
                <Play className="h-5 w-5" fill="black" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default PlaybackControls