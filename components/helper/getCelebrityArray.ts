import {scrapeFamousBirthdays} from '@/scraper/famousbirthday'
import {getArtistUrl} from '@/services/spotifyService'

type celebrityType = {
    name: string;
    image: string;
    spotify: string;
 };

 export async function getCelebrityArray(starSign: string): Promise<celebrityType[]> {
    try {
        const celebrityNameList = await scrapeFamousBirthdays(starSign);
        let celebrityList: Array<celebrityType> = [];
        for (let i=0;i<4;i++ ){
            const imageUrls = await getArtistUrl(starSign);
            celebrityList.push(
                {
                    name:celebrityNameList[i], 
                    image: imageUrls?.image||'https://i.scdn.co/image/ab6761610000e5eb2b7962ada66cbea99dcb0caa',
                    spotify: imageUrls?.spotifyUrl||'https://open.spotify.com/artist/6vWDO969PvNqNYHIOW5v0m',
                });
        }
      return celebrityList;
    } catch (error) {
      console.error('Error fetching celebrity array:', error);
      return [];
    }
  }