import axios, { AxiosResponse } from 'axios';
import { encode } from 'base-64'; 


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
      throw new Error('Failed to obtain access token');
    }
  }
  
export async function getTopTracks(artistId: string): Promise<string[]> {
    try {
        // Obtain access token
        const accessToken = await getAccessToken(clientId, clientSecret);
    
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


