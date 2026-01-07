import { SignedIn, SignedOut, SignOutButton } from "@clerk/clerk-react";
import { LayoutDashboardIcon } from "lucide-react";
import { Link } from "react-router-dom";
import SignInOAuthButtons from "./SignInOAuthButtons";

const TopBar = () => {
  const isAdmin = false;

  return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75
      backdrop-blur-md z-10">

        {/* Will be the Spotify logo */}
        <div className="flex gap-2 items-center">
          Spotify
        </div>
        <div className="flex items-center gap-4">
          {/* Admin controls will go here */}
          {isAdmin && (
            <Link to={"/admin"}>
              <LayoutDashboardIcon className="size-4 mr-2"/>
              Admin Dashboard
            </Link>
          )}
          {/* If user is signed out, display continue with Google button */}
          <SignedOut>
            <SignInOAuthButtons />
          </SignedOut>
          {/* If user is signed in, display sign out button */}
          <SignedIn>
            <SignOutButton />
          </SignedIn>
        </div>
    </div>
  )
}
export default TopBar