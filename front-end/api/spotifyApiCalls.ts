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
      console.error('SPOTIFY: Error obtaining access token:', error);
      return '';
    }
}
  
export async function getArtistId(artistName: string,accessToken: string): Promise<string | null> {
  try {
    //const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
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
    console.error('SPOTIFY: Error searching for '+artistName+':', error);
    return '';
  }
}

export async function getArtistTopTracks(artistName: string,accessToken: string): Promise<string[] | null> {
  try {
    
    //const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
    const artistId = await getArtistId(artistName,accessToken);
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
    console.error('SPOTIFY: Error fetching '+artistName+' top tracks:', error);
    return [];
  }
}

type artistInfoType = {
  id: string;
  image: string;
  spotifyUrl: string;
  songs: string[];
};
export async function getArtistInfo(artistName: string): Promise<artistInfoType | null> {
  try {
    
    const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
    const artistId = await getArtistId(artistName,accessToken)||"";
    const songsArr = await getArtistTopTracks(artistName,accessToken)||[];
    const response: AxiosResponse<any> = await axios.get(
      `https://api.spotify.com/v1/artists/${artistId}/`, // Specify country if needed
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    const artistInfo = {
      id: artistId,
      image:response.data.images[0].url,
      spotifyUrl:response.data.external_urls.spotify,
      songs:songsArr
    }

    return artistInfo;
  } catch (error) {
    console.error('SPOTIFY: Error fetching '+artistName+' urls:', error);
    //throw new Error('Failed to fetch artist top tracks');
    return{id:'', image:'',spotifyUrl:'', songs:[]};
  }
}
interface SpotifyAlbum {
  name: string;
  image: string;
}
export async function getSongInfo(songName: string): Promise<SpotifyAlbum | null> {
  try {
    const accessToken = await getAccessToken(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET);
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
          q: songName,
          type: 'track',
          limit: 1, // Limit the results to 1 track
      },
      headers: {
          Authorization: `Bearer ${accessToken}`, // Replace with your Spotify access token
      },
  });
  // Extract the album image URL from the response
  console.debug(response.data);

  return{name:"",image:""};
  } catch (error) {
    console.error('SPOTIFY: Error fetching '+songName+' urls:', error);
    //throw new Error('Failed to fetch artist top tracks');
    return{name:"",image:""};
  }
}

