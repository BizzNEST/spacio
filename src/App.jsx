import './App.css';
import React from 'react';
import '@radix-ui/themes/styles.css';
import { RouterProvider } from 'react-router-dom';
import routes from './pages/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const queryClient = new QueryClient();
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={routes} />
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
