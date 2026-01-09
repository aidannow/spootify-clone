import { ScrollArea } from "@/components/ui/scroll-area";
import { getDominantColorFromUrl } from "@/utils/albumPageUI/getDominantColor";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

 const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const [bgColor, setBgColor] = useState("rgb(80,56,160)") // fallback

  // Whenever albumId changes, fetch the album details will run
  useEffect(() => {
    if(albumId){
      fetchAlbumById(albumId);
    }
  },[fetchAlbumById, albumId]);
  // Get gradient color from dominant color
  useEffect(() => {
    const imageUrl = currentAlbum?.imageUrl
    if (!imageUrl) return

    getDominantColorFromUrl(imageUrl)
      .then(([r, g, b]) => {
        setBgColor(`rgb(${r}, ${g}, ${b})`)
      })
      .catch(() => {
        setBgColor("rgb(80,56,160)")
      })
  }, [currentAlbum?.imageUrl])

  console.log("bgColor:", bgColor);

  if (isLoading || !currentAlbum) return null;

  const rgbaColor = bgColor.replace("rgb", "rgba").replace(")", ", 0.8)");

  // Album UI
  return (
    <div className="h-full">
      <ScrollArea className="h-full">
      {/* Main Content */}
        <div className="relative min-h-full">
          {/* Background Gradient */}
          <div
            className="absolute inset-0 pointer-events-none transition-colors duration-500"
            style={{
              background: `linear-gradient(to bottom, ${rgbaColor}, #18181b)`,
            }}
            aria-hidden="true"
          />

          {/* Content */}
          <div className="relative z-10">
            <div className="flex p-6 gap-6 pb-8">
              <img src={currentAlbum?.imageUrl} alt={currentAlbum?.title}
                className="w-60 h-60 shadow-xl rounded"/>

              <div className="flex flex-col justify-end">
                <p className="text-sm font-medium">
                  Album
                </p>
                <h1 className="text-7xl font-bold my-4">
                  {currentAlbum?.title}
                </h1>

                <div className="flex items-center gap-2 text-sm text-zinc-100">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span>{currentAlbum?.songs.length} songs </span>
                  <span>{currentAlbum?.releaseYear}</span>
                </div>

              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default AlbumPage