import {getCelebByStarSign, getCelebByStarSignMongoDB} from '@/front-end/api/famousbirthdayApiCalls'
import {getArtistUrl,getArtistTopTracks} from '@/front-end/api/spotifyApiCalls'
import { Platform } from 'react-native';

type celebrityType = {
    name: string;
    image: string;
    spotify: string;
    topSongs: string[];
 };

 export async function getArtistArray(starSign: string): Promise<celebrityType[]> {
    try {
        let celebrityNameList;
        if(Platform.OS === 'web'){
            console.debug("******Pulling from Mongo DB*******");
            celebrityNameList = await getCelebByStarSignMongoDB(starSign,"singer");
        }else{
            console.debug("******Pulling from Web*******");
            celebrityNameList = await getCelebByStarSign(starSign,"singer");
        }
        let celebrityList: Array<celebrityType> = [];
        for (let i=0;i<4;i++ ){
            const imageUrls = await getArtistUrl(celebrityNameList[i])||{image:'',spotifyUrl:''};
            const songs = await getArtistTopTracks(celebrityNameList[i])||[];
            celebrityList.push(
                {
                    name:celebrityNameList[i], 
                    image: imageUrls.image,
                    spotify: imageUrls.spotifyUrl,
                    topSongs:songs
                });
        }
      return celebrityList;
    } catch (error) {
      console.error('Error fetching celebrity array:', error);
      return [];
    }
  }