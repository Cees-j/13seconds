'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function SpotifySignIn({ 
  isAuthenticated, 
  setIsAuthenticated,
  onClose 
}: { 
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  onClose?: () => void;
}) {
  const router = useRouter();

  const handleSpotifyLogin = () => {
    // Navigate to your auth route
    router.push('/api/spotify-auth');
  };

  const handleClose = () => {
    if (onClose) {
      onClose();
    }
  };

  // When used from Hero with showSignIn, always show the modal
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/60 backdrop-blur-sm">
      <div className="max-w-md mx-4 p-8 bg-purple-900/70 backdrop-blur-md rounded-2xl border border-white/20 shadow-2xl">
        <h2 className="text-2xl font-bold text-white mb-4">🎵 Connect Spotify</h2>
        <p className="text-gray-300 mb-4">
          We use Spotify to play music during the quiz.
        </p>
        <ul className="text-gray-300 mb-4 space-y-2 ml-4">
          <li>• Play song previews during the game</li>
          <li>• Control playback in sync with the quiz</li>
        </ul>
        <p className="text-sm text-gray-400 mb-6 bg-black/30 p-3 rounded-lg">
          <strong className="text-gray-200">Privacy:</strong> We only access what's needed for playback. No personal data, playlists, or listening history is stored or shared.
        </p>
        <div className="flex gap-3">
          <button
            onClick={handleSpotifyLogin}
            className="flex-1 bg-[#1DB954] hover:bg-[#1ed760] text-white font-bold py-3 px-6 rounded-full transition-all duration-200 flex items-center justify-center gap-2 transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Connect Spotify
          </button>
          <button
            onClick={handleClose}
            className="px-6 py-3 text-gray-400 hover:text-white font-medium rounded-full transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

