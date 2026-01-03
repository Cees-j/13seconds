'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        // Styling to match the app's purple gradient theme
        style: {
          background: 'rgba(88, 28, 135, 0.9)', // purple-900 with opacity
          color: '#fff',
          borderRadius: '12px',
          border: '1px solid rgba(216, 180, 254, 0.2)', // purple-300 with opacity
          backdropFilter: 'blur(8px)',
          padding: '16px',
          fontSize: '14px',
          fontWeight: '500',
        },
        success: {
          iconTheme: {
            primary: '#10b981', // green
            secondary: '#fff',
          },
          style: {
            background: 'rgba(16, 185, 129, 0.2)',
            border: '1px solid rgba(16, 185, 129, 0.5)',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444', // red
            secondary: '#fff',
          },
          style: {
            background: 'rgba(239, 68, 68, 0.2)',
            border: '1px solid rgba(239, 68, 68, 0.5)',
          },
        },
        loading: {
          iconTheme: {
            primary: '#d8b4fe', // purple-300
            secondary: '#581c87', // purple-900
          },
        },
        duration: 4000,
      }}
    />
  );
}

