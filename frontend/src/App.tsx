import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import ChatPage from "./pages/chat/ChatPage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import MainLayout from "./layout/MainLayout";
import AlbumPage from "./pages/album/AlbumPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sso-callback" 
        // Once the user signs up, redirect them to this page
        element={<AuthenticateWithRedirectCallback signUpFallbackRedirectUrl={"/auth-callback"} />}
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
        
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/albums/:albumId" element={<AlbumPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
