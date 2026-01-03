'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function SpotifySignIn() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  useEffect(() => {
    // Check if user is authenticated by looking for cookie
    const cookies = document.cookie.split(';');
    const authenticated = cookies.some(cookie => 
      cookie.trim().startsWith('spotify_authenticated=')
    );
    setIsAuthenticated(authenticated);
  }, []);

  const handleSpotifyLogin = () => {
    // Navigate to your auth route
    router.push('/api/spotify-auth');
  };

  const handleLogout = () => {
    // Clear cookies by setting them to expire
    document.cookie = 'spotify_access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'spotify_refresh_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'spotify_authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    setIsAuthenticated(false);
    window.location.reload();
  };

  if (isAuthenticated) {
    return (
      <div className="flex flex-col justify-center items-center py-12 gap-4">
        <div className="flex items-center gap-3 text-white">
          <svg className="w-8 h-8 text-[#1DB954]" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
          <span className="text-lg font-semibold">Connected to Spotify ✓</span>
        </div>
        <button
          onClick={handleLogout}
          className="text-white/70 hover:text-white text-sm underline"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-12">
      <button
        onClick={handleSpotifyLogin}
        className="bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-3 shadow-lg"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
        Sign in with Spotify
      </button>
    </div>
  );
}

