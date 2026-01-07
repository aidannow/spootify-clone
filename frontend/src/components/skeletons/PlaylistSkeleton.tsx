const PlaylistSkeleton = () => {
  // Return an array of 7 skeleton loaders for playlists
  return Array.from({ length: 10}).map((_, i) => (
    <div key={i} className="p-2 rounded-md flex items-center gap-3">
      {/* Display the Playlist Image pulse loading */}
      <div className="w-12 h-12 bg-zinc-800 rounded-md shrink-0
        animate-pulse"/>
      {/* Diplay the title and info */}
      <div className="flex-1 min-w-0 hidden md:block space-y-2">
        <div className="h-4 bg-zinc-800 rounded animate-pulse w-3/4"/>
        <div className="h-3 bg-zinc-800 rounded animate-pulse w-1/2"/>
      </div>
    </div>
  ));
}

export default PlaylistSkeleton