class SpotifyAPI {
  constructor() {
    this.baseURL = 'https://api.spotify.com/v1';
    this.authURL = 'https://accounts.spotify.com/api/token';
    this.clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
    this.clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
    this.redirectUri = import.meta.env.VITE_REDIRECT_URI || 'http://127.0.0.1:4000/callback';
    this.token = null;
    this.tokenExpiry = null;
  }

  // Generate code verifier for PKCE
  generateCodeVerifier() {
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~';
    const values = crypto.getRandomValues(new Uint8Array(128));
    return values.reduce((acc, x) => acc + possible[x % possible.length], "");
  }

  // Generate code challenge for PKCE
  async generateCodeChallenge(codeVerifier) {
    const data = new TextEncoder().encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return btoa(String.fromCharCode.apply(null, [...new Uint8Array(digest)]))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  }

  // Get authorization URL for user login
  async getAuthorizationUrl() {
    const codeVerifier = this.generateCodeVerifier();
    const codeChallenge = await this.generateCodeChallenge(codeVerifier);
    
    // Store code verifier for later use
    localStorage.setItem('spotify_code_verifier', codeVerifier);
    
    const scope = 'user-read-private user-read-email playlist-read-private user-top-read user-read-recently-played streaming user-read-playback-state user-modify-playback-state';
    
    const authUrl = new URL('https://accounts.spotify.com/authorize');
    authUrl.searchParams.append('client_id', this.clientId);
    authUrl.searchParams.append('response_type', 'code');
    authUrl.searchParams.append('redirect_uri', this.redirectUri);
    authUrl.searchParams.append('scope', scope);
    authUrl.searchParams.append('code_challenge_method', 'S256');
    authUrl.searchParams.append('code_challenge', codeChallenge);
    
    return authUrl.toString();
  }

  // Exchange authorization code for access token
  async getAccessToken(code) {
    const codeVerifier = localStorage.getItem('spotify_code_verifier');
    
    const response = await fetch(this.authURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: this.redirectUri,
        code_verifier: codeVerifier,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get access token');
    }

    const data = await response.json();
    this.token = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    
    // Store token in localStorage
    localStorage.setItem('spotify_access_token', this.token);
    localStorage.setItem('spotify_token_expiry', this.tokenExpiry.toString());
    localStorage.removeItem('spotify_code_verifier');
    
    return data;
  }

  // Get client credentials token (for public data only)
  async getClientCredentialsToken() {
    const response = await fetch(this.authURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${btoa(`${this.clientId}:${this.clientSecret}`)}`,
      },
      body: new URLSearchParams({
        grant_type: 'client_credentials',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to get client credentials token');
    }

    const data = await response.json();
    this.token = data.access_token;
    this.tokenExpiry = Date.now() + (data.expires_in * 1000);
    
    return data;
  }

  // Check if token is valid
  isTokenValid() {
    return this.token && this.tokenExpiry && Date.now() < this.tokenExpiry;
  }

  // Load token from localStorage
  loadStoredToken() {
    const storedToken = localStorage.getItem('spotify_access_token');
    const storedExpiry = localStorage.getItem('spotify_token_expiry');
    
    if (storedToken && storedExpiry && Date.now() < parseInt(storedExpiry)) {
      this.token = storedToken;
      this.tokenExpiry = parseInt(storedExpiry);
      return true;
    }
    
    return false;
  }

  // Make authenticated API request
  async makeRequest(endpoint, options = {}) {
    if (!this.isTokenValid()) {
      throw new Error('No valid access token');
    }

    const url = `${this.baseURL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized - token may be expired');
      }
      throw new Error(`API request failed: ${response.status}`);
    }

    return response.json();
  }

  // Get user's playlists
  async getUserPlaylists(limit = 20) {
    return this.makeRequest(`/me/playlists?limit=${limit}`);
  }

  // Get playlist tracks
  async getPlaylistTracks(playlistId, limit = 50) {
    return this.makeRequest(`/playlists/${playlistId}/tracks?limit=${limit}`);
  }

  // Get featured playlists
  async getFeaturedPlaylists(limit = 20) {
    return this.makeRequest(`/browse/featured-playlists?limit=${limit}`);
  }

  // Get top tracks
  async getTopTracks(timeRange = 'medium_term', limit = 20) {
    return this.makeRequest(`/me/top/tracks?time_range=${timeRange}&limit=${limit}`);
  }

  // Get top artists
  async getTopArtists(timeRange = 'medium_term', limit = 20) {
    return this.makeRequest(`/me/top/artists?time_range=${timeRange}&limit=${limit}`);
  }

  // Get recently played tracks
  async getRecentlyPlayed(limit = 20) {
    return this.makeRequest(`/me/player/recently-played?limit=${limit}`);
  }

  // Search for tracks, artists, albums, playlists
  async search(query, types = ['track'], limit = 20) {
    const typeString = types.join(',');
    const encodedQuery = encodeURIComponent(query);
    return this.makeRequest(`/search?q=${encodedQuery}&type=${typeString}&limit=${limit}`);
  }

  // Get artist's related artists
  async getRelatedArtists(artistId) {
    return this.makeRequest(`/artists/${artistId}/related-artists`);
  }

  // Get artist's top tracks
  async getArtistTopTracks(artistId, market = 'US') {
    return this.makeRequest(`/artists/${artistId}/top-tracks?market=${market}`);
  }

  // Get categories
  async getCategories(limit = 20) {
    return this.makeRequest(`/browse/categories?limit=${limit}`);
  }

  // Get category playlists
  async getCategoryPlaylists(categoryId, limit = 20) {
    return this.makeRequest(`/browse/categories/${categoryId}/playlists?limit=${limit}`);
  }

  // Get new releases
  async getNewReleases(limit = 20) {
    return this.makeRequest(`/browse/new-releases?limit=${limit}`);
  }

  // Get recommendations
  async getRecommendations(seedTracks = [], seedArtists = [], seedGenres = [], limit = 20) {
    const params = new URLSearchParams();
    
    if (seedTracks.length > 0) params.append('seed_tracks', seedTracks.join(','));
    if (seedArtists.length > 0) params.append('seed_artists', seedArtists.join(','));
    if (seedGenres.length > 0) params.append('seed_genres', seedGenres.join(','));
    params.append('limit', limit.toString());
    
    return this.makeRequest(`/recommendations?${params.toString()}`);
  }

  // Get track audio features
  async getAudioFeatures(trackId) {
    return this.makeRequest(`/audio-features/${trackId}`);
  }

  // Get user profile
  async getUserProfile() {
    return this.makeRequest('/me');
  }

  // Transform Spotify track data to match your component's expected format
  transformTrackData(spotifyTrack) {
    const track = spotifyTrack.track || spotifyTrack;
    
    return {
      id: track.id,
      title: track.name,
      artist: track.artists.map(artist => artist.name).join(', '),
      album: track.album.name,
      duration: this.formatDuration(track.duration_ms),
      durationSeconds: Math.floor(track.duration_ms / 1000),
      cover: track.album.images[0]?.url || track.album.images[1]?.url || '',
      genre: track.album.genres?.[0] || 'Unknown',
      year: new Date(track.album.release_date).getFullYear().toString(),
      isLiked: false, // You'd need to check saved tracks for this
      plays: track.popularity ? `${track.popularity}%` : 'N/A',
      dominantColor: '#1a1b3e', // You could extract this from album art
      accentColor: '#4c51bf',
      mood: this.determineMood(track),
      preview_url: track.preview_url,
      external_urls: track.external_urls,
      lyrics: [] // You'd need a lyrics service for this
    };
  }

  // Transform artist data
  transformArtistData(spotifyArtist) {
    return {
      name: spotifyArtist.name,
      followers: this.formatNumber(spotifyArtist.followers.total),
      avatar: spotifyArtist.images[0]?.url || spotifyArtist.images[1]?.url || '',
      genres: spotifyArtist.genres,
      popularity: spotifyArtist.popularity,
      id: spotifyArtist.id
    };
  }

  // Transform playlist data
  transformPlaylistData(spotifyPlaylist) {
    return {
      title: spotifyPlaylist.name,
      subtitle: spotifyPlaylist.description || '',
      cover: spotifyPlaylist.images[0]?.url || spotifyPlaylist.images[1]?.url || '',
      mood: this.determineMoodFromDescription(spotifyPlaylist.description),
      id: spotifyPlaylist.id,
      total_tracks: spotifyPlaylist.tracks.total
    };
  }

  // Helper methods
  formatDuration(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  }

  determineMood(track) {
    // Simple mood determination based on available data
    if (track.energy > 0.7) return 'energetic';
    if (track.valence > 0.7) return 'happy';
    if (track.danceability > 0.7) return 'danceable';
    if (track.acousticness > 0.7) return 'acoustic';
    if (track.instrumentalness > 0.5) return 'instrumental';
    return 'calm';
  }

  determineMoodFromDescription(description) {
    if (!description) return 'energetic';
    
    const desc = description.toLowerCase();
    if (desc.includes('chill') || desc.includes('relax')) return 'calm';
    if (desc.includes('focus') || desc.includes('study')) return 'focused';
    if (desc.includes('party') || desc.includes('dance')) return 'energetic';
    if (desc.includes('indie') || desc.includes('alternative')) return 'nostalgic';
    if (desc.includes('electronic') || desc.includes('techno')) return 'urban';
    if (desc.includes('ambient') || desc.includes('meditation')) return 'ethereal';
    
    return 'energetic';
  }
}

export default SpotifyAPI;
