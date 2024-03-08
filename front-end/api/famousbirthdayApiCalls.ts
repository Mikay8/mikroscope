import axios, { AxiosResponse }  from 'axios';
import { JSDOM } from 'jsdom';
import { MONGODB_URL } from '@env'; 

export async function getCelebByStarSign(starSign: string, job: string): Promise<string[]> {
    try {
      // Fetch the HTML content of the famousbirthdays.com page
      const response = await fetch(`https://www.famousbirthdays.com/astrology/career/${starSign}-${job}.html`);
      const html = await response.text();
      
      const celebrityNames: string[] = [];
  
      const nameRegex = /<p class="type-16-18-small">\s*(.*?)\s*,\s*\d+\s*<\/p>/g;
      let match;
      let str= "";
        //console.log(html)
      while ((match = nameRegex.exec(html)) !== null) {
        //console.debug(match);
        celebrityNames.push(match[1]);
        str+="{name: \""+match[1]+"\", starSign: \""+starSign+"\", profession: \""+job+"\"}, \n ";
      }
      //console.debug("["+str+"]");
      return celebrityNames;
    } catch (error) {
      console.error('Error scraping famousbirthdays.com:', error);
      return [];
    }
  }
  //Back up or for Web
  export async function getCelebByStarSignMongoDB(starSign: string, job: string): Promise<string[]> {
    try {
        
        // Make request to Spotify API to get top tracks
        const response: AxiosResponse<any> = await axios.get(`${MONGODB_URL}/getCelebrity?star=${starSign}&job=${job}`);
        // Extract top track names
        const celebs: string[] = response.data.map((celeb: any) => celeb.name);
        return celebs;
      } catch (error) {
        console.error('MONGODB: Error retrieving '+starSign+" "+job+": ", error);
        return [];
      }
}
