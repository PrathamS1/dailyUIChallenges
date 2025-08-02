import { useState, useEffect, useCallback, useMemo } from 'react';
import SpotifyAPI from '../services/spotifyAPI';

export const useSpotifyAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const spotifyAPI = useMemo(() => new SpotifyAPI(), []);

  const handleAuthCallback = useCallback(async (code) => {
    try {
      await spotifyAPI.getAccessToken(code);
      const userProfile = await spotifyAPI.getUserProfile();
      setUser(userProfile);
      setIsAuthenticated(true);
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    }
  }, [spotifyAPI]);

  const checkAuthStatus = useCallback(async () => {
    try {
      setIsLoading(true);
      
      // Try to load stored token
      if (spotifyAPI.loadStoredToken()) {
        // Verify token by getting user profile
        try {
          const userProfile = await spotifyAPI.getUserProfile();
          setUser(userProfile);
          setIsAuthenticated(true);
        } catch {
          // Token is invalid, clear it
          localStorage.removeItem('spotify_access_token');
          localStorage.removeItem('spotify_token_expiry');
          setIsAuthenticated(false);
        }
      } else {
        // Check if we have an authorization code in URL
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        
        if (code) {
          await handleAuthCallback(code);
        } else {
          setIsAuthenticated(false);
        }
      }
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  }, [spotifyAPI, handleAuthCallback]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async () => {
    try {
      const authUrl = await spotifyAPI.getAuthorizationUrl();
      window.location.href = authUrl;
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('spotify_token_expiry');
    localStorage.removeItem('spotify_code_verifier');
    setIsAuthenticated(false);
    setUser(null);
  };

  // For demo purposes - get client credentials token
  const loginAsGuest = async () => {
    try {
      setIsLoading(true);
      await spotifyAPI.getClientCredentialsToken();
      setIsAuthenticated(true);
      setUser({ display_name: 'Guest User', id: 'guest' });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isAuthenticated,
    isLoading,
    user,
    error,
    login,
    logout,
    loginAsGuest,
    spotifyAPI
  };
};
