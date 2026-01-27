import './App.css';
import React from 'react';
import '@radix-ui/themes/styles.css';
import { RouterProvider } from 'react-router-dom';
import routes from './pages/Routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/authContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Bounce, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ThemeProvider from './contexts/themeContext';

const queryClient = new QueryClient();
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;

function App() {
  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <RouterProvider router={routes} />
            <ToastContainer
              className={'toast'}
              position="bottom-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={true}
              rtl={false}
              pauseOnHover={false}
              draggable
              theme="colored"
              transition={Bounce}
            />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
