import { ScrollArea } from "@/components/ui/scroll-area";
import { getDominantColorFromUrl } from "@/utils/albumPageUI/getDominantColor";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Clock, Play } from "lucide-react";

const formatDuration = (durationInSeconds: number) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  // Pad seconds with leading zero if needed
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const [bgColor, setBgColor] = useState("rgb(80,56,160)"); // fallback

  // Whenever albumId changes, fetch the album details will run
  useEffect(() => {
    if (albumId) {
      fetchAlbumById(albumId);
    }
  }, [fetchAlbumById, albumId]);
  // Get gradient color from dominant color
  useEffect(() => {
    const imageUrl = currentAlbum?.imageUrl;
    if (!imageUrl) return;

    getDominantColorFromUrl(imageUrl)
      .then(([r, g, b]) => {
        setBgColor(`rgb(${r}, ${g}, ${b})`);
      })
      .catch(() => {
        setBgColor("rgb(80,56,160)");
      });
  }, [currentAlbum?.imageUrl]);

  if (isLoading || !currentAlbum) return null;

  const rgbaColor = bgColor.replace("rgb", "rgba").replace(")", ", 0.8)");

  // Album UI
  return (
    <div className="h-full">
			<ScrollArea className='h-full rounded-md'>
      {/* Main Content */}
				<div className='h-full'>
          {/* Background Gradient */}
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-500"
            // Strong colour at the top fading to dark at the bottom
            style={{
              background: `linear-gradient(
                to bottom,
                ${rgbaColor} 0%,
                #121212 50%,
                #121212 100%
              )`,
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10 flex-1">
            <div className="flex p-6 gap-6 pb-8">
              <img
                src={currentAlbum?.imageUrl}
                alt={currentAlbum?.title}
                className="w-60 h-60 shadow-xl rounded"
              />

              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">Album</p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>• {currentAlbum?.songs.length} songs </span>
                  <span>• {currentAlbum?.releaseYear}</span>
                </div>
              </div>
            </div>

            {/* Play button Controls */}
            <div className="px-6 pb-4 flex items-center gap-6">
              <Button
                size="icon"
                className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all cursor-pointer"
              >
                <Play className="w-7 h-7 text-black" fill="black" />
              </Button>
            </div>

            {/* Table Section */}
            <div>
              {/* Table Header */}
              <div
                className="grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-10 py-2 text-sm text-zinc-300"
              >
                <div>#</div>
                <div>Title</div>
                <div>Released Date</div>
                <div>
                  <Clock className="h-4 w-4" />
                </div>
              </div>
            </div>

            {/* Song List */}
            <div className="px-6">
              <div className="space-y-2 py-4">
                {currentAlbum.songs.map((song, index) => (
                  <div key={song._id}
                    className={`grid grid-cols-[16px_4fr_2fr_1fr] gap-4 px-4 py-2 text-sm
                      text-zinc-400 hover:bg-white/5 rounded-md group`}
                  >

                    <div className="flex items-center justify-center">
                      {/* When hover the song index should disappear and be replaced by play icon */}
                      <span className="group-hover:hidden">{index + 1}</span>
                      <Play className="h-3 w-3 hidden group-hover:block fill-white stroke-0"/>
                    </div>

                    <div className="flex items-center gap-3">
                      <img src={song.imageUrl} alt={song.title}
                        className="size-10"
                      />

                      <div>
                        <div className={`font-medium text-white`}>{song.title}</div>
                        <div>{song.artist}</div>
                      </div>
                    </div>

                    <div className="flex items-center">{song.createdAt.split("T")[0]}</div>
                    <div className="flex items-center">{formatDuration(song.duration)}</div>

                  </div>  
                ))}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
