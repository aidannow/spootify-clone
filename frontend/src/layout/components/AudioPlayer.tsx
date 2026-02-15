import { usePlayerStore } from "@/stores/usePlayerStore"
import { useEffect, useRef } from "react"

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const prevSongRef = useRef<string | null>(null)

  const { currentSong, isPlaying, playNext } = usePlayerStore();

  // Use effect to handle play/pause logic
  useEffect(() => {
    if (isPlaying) audioRef.current?.play();
    else audioRef.current?.pause();
  },[isPlaying]);

  // Use effect to handle song ends
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handleEnded = () => {
      usePlayerStore.getState().playNext();
    };

    audioElement?.addEventListener('ended', handleEnded);

    return () => {
      audioElement?.removeEventListener('ended', handleEnded);
    }
  }, [playNext]);

  // Use effect to handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;
    const audioElement = audioRef.current;
    if (!audioElement) return;

    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?._id;

    if (isSongChange) {
      audioElement.src = currentSong ? currentSong.audioUrl : '';
      // Reset playback position
      audioElement.currentTime = 0;
      // Save the current song URL as previous
      prevSongRef.current = currentSong ? currentSong._id : null;
      // Auto play the new song
      if (isPlaying) audioElement.play();
    }

  }, [currentSong, isPlaying])

  return <audio ref={audioRef} />
}

export default AudioPlayer