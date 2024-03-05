import axios, { AxiosResponse } from 'axios';
import { encode } from 'base-64'; 
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } from '@env'; 

const clientId = '';
const clientSecret = '';
async function getAccessToken(clientId: string, clientSecret: string): Promise<string> {
    try {
      const authHeader = 'Basic ' + encode(`${clientId}:${clientSecret}`);
      const response: AxiosResponse<any> = await axios.post(
        'https://accounts.spotify.com/api/token',
        null,
        {
          params: {
            grant_type: 'client_credentials'
          },
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
  
      return response.data.access_token;
    } catch (error) {
      console.error('Error obtaining access token:', error);
      return '';
    }
  }
  
export async function getTopTracks(artistId: string): Promise<string[]> {
    try {
        // Obtain access token
        const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
    
        // Make request to Spotify API to get top tracks
        const response: AxiosResponse<any> = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
    
        // Extract top track names
        const topTracks: string[] = response.data.tracks.map((track: any) => track.name);
        return topTracks;
      } catch (error) {
        console.error('Error retrieving top tracks:', error);
        return [];
      }
}

export async function getArtistId(artistName: string): Promise<string | null> {
  try {
    const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
    const response: AxiosResponse<any> = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    const artists = response.data.artists.items;
    if (artists.length > 0) {
      return artists[0].id; // Return the ID of the first artist found
    } else {
      return null; // Return null if no artist with the given name is found
    }
  } catch (error) {
    console.error('Error searching for artist:', error);
    return '';
  }
}

export async function getArtistTopTracks(artistName: string): Promise<string[] | null> {
  try {
    
    const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
    const artistId = await getArtistId(artistName);
    if (!artistId) {
      throw new Error('Artist not found');
    }

    
    const response: AxiosResponse<any> = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/top-tracks?country=US`, // Specify country if needed
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    const topTracks = response.data.tracks.map((track: any) => track.name);
    return topTracks;
  } catch (error) {
    console.error('Error fetching artist top tracks:', error);
    return [];
  }
}

type artistUrlType = {
  image: string;
  spotifyUrl: string;
};
export async function getArtistUrl(artistName: string): Promise<artistUrlType | null> {
  try {
    
    const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
    const artistId = await getArtistId(artistName);
    
    const response: AxiosResponse<any> = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/`, // Specify country if needed
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    const image = {image:response.data.images[0].url,
      spotifyUrl:response.data.external_urls.spotify,
    }

    return image;
  } catch (error) {
    console.error('Error fetching artist:', error);
    //throw new Error('Failed to fetch artist top tracks');
    return{image:'',spotifyUrl:''};
  }
}

