import { SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";
import { useAuthStore } from "@/stores/useAuthStore";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

const TopBar = () => {
  const { isAdmin } = useAuthStore();

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75
      backdrop-blur-md z-10">

        {/* Will be the Spotify logo */}
        <div className="flex gap-2 items-center">
          <img src="/spotify.png" className="size-8" alt="Spotify Logo"/>
          Spotify
        </div>
        <div className="flex items-center gap-4">
          {/* Admin controls will go here */}
          {isAdmin && (
            <Link to={"/admin"}
              className={cn(
                buttonVariants({variant: "outline"})
              )}
            >
              <LayoutDashboardIcon className="size-4 mr-2"/>
              Admin Dashboard
            </Link>
          )}
          {/* If user is signed out, display continue with Google button */}
          <SignedOut>
            <SignInOAuthButtons />
          </SignedOut>

          <UserButton />

        </div>
    </div>
  )
}
export default TopBar