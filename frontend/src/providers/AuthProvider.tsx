import { axiosInstance } from '@/lib/axios';
import { useAuth } from '@clerk/clerk-react';
import axios from 'axios';
import { Loader } from 'lucide-react';
import React, { useEffect, useState } from 'react';

/**
 * Updates the API client with the provided token.
 * @param token - API token to be set in the API client, can be null.
 */
const updateApiToken = (token: string | null) => {
  if(token) {
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else { // Tell backend user is not authenticated
    delete axiosInstance.defaults.headers.common['Authorization'];
  }
}

const AuthProvider = ({children}:{children:React.ReactNode}) => {
  const {getToken} = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = await getToken();
        updateApiToken(token);
      } catch (error) {
        updateApiToken(null);
        console.log('Error in auth provider');
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  },[getToken]);

  if (loading) return (
    <div className="h-screen w-full flex items-center justify-center">
      <Loader className='size-8 text-emerald-500 animate-spin'/>
    </div>
  )

  return <>{children}</>;
}

export default AuthProvider