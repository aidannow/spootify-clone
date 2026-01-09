import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton"
import { buttonVariants } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { useMusicStore } from "@/stores/useMusicStore"
import { SignedIn } from "@clerk/clerk-react"
import { HomeIcon, Library, MessageCircle } from "lucide-react"
import { useEffect } from "react"
import { Link } from "react-router-dom"

const LeftSideBar = () => {
  // Data fetching logic => zustand (global data to be used in all components)
  const {albums, fetchAlbums, isLoading} = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  },[fetchAlbums]);

  console.log("Albums in LeftSideBar:", albums);

  return (
    <div className="h-full flex flex-col gap-2">

      {/* Navigation Menu */}
      <div className="rounded-lg bg-zinc-900 p-4">
        <div className="space-y-2">

          {/* Home Button */}
          <Link to={"/"}
            className={cn(buttonVariants(
              { 
                variant: "ghost",
                className: "w-full justify-start text-white hover:bg:zinc-800",
              })
            )}>
            <HomeIcon className="size-5 mr-2"/>
            <span className="hidden md:inline">Home</span>
          </Link>

          {/* Message Button */}
          <SignedIn>
            <Link to={"/chat"}
              className={cn(buttonVariants(
                { 
                  variant: "ghost",
                  className: "w-full justify-start text-white hover:bg:zinc-800",
                })
              )}>
              <MessageCircle className="size-5 mr-2"/>
              <span className="hidden md:inline">Messages</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library Section */}
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2"/>
            <span className="hidden md:inline font-semibold">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            {isLoading ? (
              // If loading, show loading playlist loading skeletons
              <PlaylistSkeleton/>
            ) : ( // else if not loading, show this
              albums.map((album) => (
                <Link to={`/albums/${album._id}`} key={album._id}
                className="p-2 hover::bg-zinc-800 rounded-md flex items-center gap-3 group cursor-pointer">
                  {/* Album Cover Image */}
                  <img 
                  src={album.imageUrl}
                  alt="Playlist img" 
                  className="size-12 rounded-md shrink-0 object-cover"/>

                  {/* Album metadata */}
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">
                      {album.title}
                    </p>
                    <p className="text-sm text-zinc-400 truncate">
                      Album • {album.artist}
                    </p>
                  </div>

                </Link>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

    </div>
  )
}

export default LeftSideBar