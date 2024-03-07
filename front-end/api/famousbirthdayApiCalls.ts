import axios, { AxiosResponse }  from 'axios';
import { JSDOM } from 'jsdom';

export async function getArtistsByStarSign(starSign: string): Promise<string[]> {
    try {
      // Fetch the HTML content of the famousbirthdays.com page
      const response = await fetch(`https://www.famousbirthdays.com/astrology/career/${starSign}-singer.html`);
      const html = await response.text();
      
      const celebrityNames: string[] = [];
  
      const nameRegex = /<p class="type-16-18-small">\s*(.*?)\s*,\s*\d+\s*<\/p>/g;
      let match;
        //console.log(html)
      while ((match = nameRegex.exec(html)) !== null) {
        //console.debug(match);
        celebrityNames.push(match[1]);
      }
      //console.debug(celebrityNames)
      return celebrityNames;
    } catch (error) {
      console.error('Error scraping famousbirthdays.com:', error);
      return [];
    }
  }
  
  export async function getArtistsByStarSign2(starSign: string, job: string): Promise<string[]> {
    try {
        
        // Make request to Spotify API to get top tracks

        // Extract top track names
        const celebs: string[] = response.data.map((celeb: any) => celeb.name);
        console.debug(celebs)
        return celebs;
      } catch (error) {
        console.error('Error retrieving top tracks:', error);
        return [];
      }
}
