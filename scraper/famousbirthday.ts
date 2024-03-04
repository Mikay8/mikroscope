import axios from 'axios';
import { JSDOM } from 'jsdom';

export async function scrapeFamousBirthdays(starSign: string): Promise<string[]> {
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
      
      return celebrityNames;
    } catch (error) {
      console.error('Error scraping famousbirthdays.com:', error);
      return [];
    }
  }
  

