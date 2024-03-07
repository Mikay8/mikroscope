import {getArtistsByStarSign,getArtistsByStarSign2} from '@/front-end/api/famousbirthdayApiCalls'
import {getArtistUrl} from '@/front-end/api/spotifyApiCalls'

type celebrityType = {
    name: string;
    image: string;
    spotify: string;
 };

 export async function getCelebrityArray(starSign: string): Promise<celebrityType[]> {
    try {
        const celebrityNameList = await getArtistsByStarSign(starSign);
        getArtistsByStarSign2(starSign,"singer");
        let celebrityList: Array<celebrityType> = [];
        for (let i=0;i<4;i++ ){
            const imageUrls = await getArtistUrl(celebrityNameList[i])||{image:'',spotifyUrl:''};
            celebrityList.push(
                {
                    name:celebrityNameList[i], 
                    image: imageUrls.image,
                    spotify: imageUrls.spotifyUrl,
                });
        }
      return celebrityList;
    } catch (error) {
      console.error('Error fetching celebrity array:', error);
      return [];
    }
  }