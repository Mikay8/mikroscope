import {getCelebByStarSign, getCelebByStarSignMongoDB} from '@/front-end/api/famousbirthdayApiCalls'
import {getArtistInfo} from '@/front-end/api/spotifyApiCalls'
import { Platform } from 'react-native';

type celebrityType = {
    id:string;
    name: string;
    image: string;
    spotify: string;
    topSongs: string[];
 };

 export async function getArtistArray(starSign: string, startIdx: number, endIdx: number): Promise<celebrityType[]> {
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
        for (let i=startIdx;i<endIdx;i++ ){
            // const imageUrls = await getArtistUrl(celebrityNameList[i])||{image:'',spotifyUrl:''};
            // const songs = await getArtistTopTracks(celebrityNameList[i])||[];
            const artistInfo = await getArtistInfo(celebrityNameList[i])||{id:'',image:'',spotifyUrl:'',songs:[]}
            celebrityList.push(
                {
                    id: artistInfo.id,
                    name: celebrityNameList[i], 
                    image: artistInfo.image,
                    spotify: artistInfo.spotifyUrl,
                    topSongs: artistInfo.songs
                });
        }
      
      return celebrityList;
    } catch (error) {
      console.error('Error fetching celebrity array:', error);
      return [];
    }
  }