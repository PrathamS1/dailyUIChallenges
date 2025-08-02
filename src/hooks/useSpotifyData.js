import { useState, useEffect, useCallback } from 'react';

export const useSpotifyData = (spotifyAPI, isAuthenticated) => {
  const [playlist, setPlaylist] = useState([]);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [similarArtists, setSimilarArtists] = useState([]);
  const [chartsAndMoods, setChartsAndMoods] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch user's top tracks for playlist
  const fetchPlaylist = useCallback(async () => {
    if (!spotifyAPI || !isAuthenticated) return;
    
    try {
      const response = await spotifyAPI.getTopTracks('medium_term', 20);
      const transformedTracks = response.items.map(track => 
        spotifyAPI.transformTrackData(track)
      );
      setPlaylist(transformedTracks);
    } catch (err) {
      console.error('Error fetching playlist:', err);
      // Fallback to featured playlists if top tracks fail
      try {
        const featuredResponse = await spotifyAPI.getFeaturedPlaylists(1);
        if (featuredResponse.playlists.items.length > 0) {
          const playlistId = featuredResponse.playlists.items[0].id;
          const tracksResponse = await spotifyAPI.getPlaylistTracks(playlistId, 20);
          const transformedTracks = tracksResponse.items
            .filter(item => item.track)
            .map(item => spotifyAPI.transformTrackData(item.track));
          setPlaylist(transformedTracks);
        }
      } catch (fallbackErr) {
        console.error('Fallback playlist fetch failed:', fallbackErr);
      }
    }
  }, [spotifyAPI, isAuthenticated]);

  // Fetch trending songs (featured playlists or new releases)
  const fetchTrendingSongs = useCallback(async () => {
    if (!spotifyAPI || !isAuthenticated) return;
    
    try {
      const response = await spotifyAPI.getNewReleases(10);
      const transformedTracks = [];
      
      // Get first track from each album
      for (const album of response.albums.items.slice(0, 3)) {
        try {
          const albumTracks = await spotifyAPI.makeRequest(`/albums/${album.id}/tracks?limit=1`);
          if (albumTracks.items.length > 0) {
            const track = albumTracks.items[0];
            track.album = album; // Add album info
            const transformedTrack = spotifyAPI.transformTrackData(track);
            transformedTrack.trend = `+${Math.floor(Math.random() * 20) + 5}%`; // Mock trend data
            transformedTracks.push(transformedTrack);
          }
        } catch {
          // Skip if album tracks can't be fetched
        }
      }
      
      setTrendingSongs(transformedTracks);
    } catch (err) {
      console.error('Error fetching trending songs:', err);
    }
  }, [spotifyAPI, isAuthenticated]);

  // Fetch similar artists
  const fetchSimilarArtists = useCallback(async (currentArtistId) => {
    if (!spotifyAPI || !isAuthenticated || !currentArtistId) return;
    
    try {
      const response = await spotifyAPI.getRelatedArtists(currentArtistId);
      const transformedArtists = response.artists.slice(0, 3).map(artist => 
        spotifyAPI.transformArtistData(artist)
      );
      setSimilarArtists(transformedArtists);
    } catch (err) {
      console.error('Error fetching similar artists:', err);
      // Fallback to top artists
      try {
        const topArtistsResponse = await spotifyAPI.getTopArtists('medium_term', 3);
        const transformedArtists = topArtistsResponse.items.map(artist => 
          spotifyAPI.transformArtistData(artist)
        );
        setSimilarArtists(transformedArtists);
      } catch (fallbackErr) {
        console.error('Fallback similar artists fetch failed:', fallbackErr);
      }
    }
  }, [spotifyAPI, isAuthenticated]);

  // Fetch charts and moods (categories and featured playlists)
  const fetchChartsAndMoods = useCallback(async () => {
    if (!spotifyAPI || !isAuthenticated) return;
    
    try {
      const categoriesResponse = await spotifyAPI.getCategories(6);
      const transformedCategories = categoriesResponse.categories.items.map(category => ({
        title: category.name,
        subtitle: category.name.toLowerCase().includes('hits') ? 'Global chart-toppers' : 
                  category.name.toLowerCase().includes('chill') ? 'Relaxing beats' :
                  category.name.toLowerCase().includes('focus') ? 'Ambient concentration' :
                  'Curated playlist collection',
        cover: category.icons[0]?.url || '',
        mood: spotifyAPI.determineMoodFromDescription(category.name),
        id: category.id
      }));
      
      setChartsAndMoods(transformedCategories);
    } catch (err) {
      console.error('Error fetching charts and moods:', err);
      // Fallback to featured playlists
      try {
        const featuredResponse = await spotifyAPI.getFeaturedPlaylists(6);
        const transformedPlaylists = featuredResponse.playlists.items.map(playlist => 
          spotifyAPI.transformPlaylistData(playlist)
        );
        setChartsAndMoods(transformedPlaylists);
      } catch (fallbackErr) {
        console.error('Fallback charts and moods fetch failed:', fallbackErr);
      }
    }
  }, [spotifyAPI, isAuthenticated]);

  // Fetch all data
  const fetchAllData = useCallback(async (currentArtistId = null) => {
    if (!spotifyAPI || !isAuthenticated) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.allSettled([
        fetchPlaylist(),
        fetchTrendingSongs(),
        fetchChartsAndMoods(),
        currentArtistId ? fetchSimilarArtists(currentArtistId) : Promise.resolve()
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [spotifyAPI, isAuthenticated, fetchPlaylist, fetchTrendingSongs, fetchChartsAndMoods, fetchSimilarArtists]);

  // Search functionality
  const searchTracks = useCallback(async (query) => {
    if (!spotifyAPI || !isAuthenticated || !query.trim()) return [];
    
    try {
      const response = await spotifyAPI.search(query, ['track'], 10);
      return response.tracks.items.map(track => spotifyAPI.transformTrackData(track));
    } catch (err) {
      console.error('Error searching tracks:', err);
      return [];
    }
  }, [spotifyAPI, isAuthenticated]);

  // Get recommendations based on current track
  const getRecommendations = useCallback(async (currentTrackId, currentArtistId) => {
    if (!spotifyAPI || !isAuthenticated) return [];
    
    try {
      const response = await spotifyAPI.getRecommendations(
        [currentTrackId], 
        [currentArtistId], 
        [], 
        10
      );
      return response.tracks.map(track => spotifyAPI.transformTrackData(track));
    } catch (err) {
      console.error('Error getting recommendations:', err);
      return [];
    }
  }, [spotifyAPI, isAuthenticated]);

  // Effect to fetch data when authentication status changes
  useEffect(() => {
    if (isAuthenticated && spotifyAPI) {
      fetchAllData();
    }
  }, [isAuthenticated, spotifyAPI, fetchAllData]);

  return {
    playlist,
    trendingSongs,
    similarArtists,
    chartsAndMoods,
    isLoading,
    error,
    fetchAllData,
    fetchSimilarArtists,
    searchTracks,
    getRecommendations,
    setPlaylist,
    setTrendingSongs,
    setSimilarArtists,
    setChartsAndMoods
  };
};
