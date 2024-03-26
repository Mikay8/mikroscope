import {getCelebByStarSign, getCelebByStarSignMongoDB} from '@/front-end/api/famousbirthdayApiCalls'
import {getArtistInfo,getSongInfo} from '@/front-end/api/spotifyApiCalls'
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
        const ceil = Math.floor(Math.random() * (celebrityNameList.length-4));
        for (let i=ceil;i<ceil+4;i++ ){
            // const imageUrls = await getArtistUrl(celebrityNameList[i])||{image:'',spotifyUrl:''};
            // const songs = await getArtistTopTracks(celebrityNameList[i])||[];
            const artistInfo = await getArtistInfo(celebrityNameList[i])||{id:'',image:'',spotifyUrl:'',songs:[]}
            if(artistInfo.songs.length>0){
                celebrityList.push(
                  {
                      id: artistInfo.id,
                      name: celebrityNameList[i], 
                      image: artistInfo.image,
                      spotify: artistInfo.spotifyUrl,
                      topSongs: artistInfo.songs
                  });
              
                  // console.debug(artistInfo.songs[0]+" "+celebrityNameList[i]);
                  //getSongInfo(artistInfo.songs[0]+" "+celebrityNameList[i]);
            }
            
        }
      
      return celebrityList;
    } catch (error) {
      console.error('Error fetching celebrity array:', error);
      return [];
    }
  }
  type songType = {
    
    songName: string;
    artist: string;
    image: string;
    album: string;
 };

 export async function getSong(songName: string, songArtist: string): Promise<songType> {
    try {
        
      const artistInfo = await getSongInfo(songName+" "+songArtist)||{name:"", image:""}
      console.debug(songName)
      console.debug(songArtist)
      console.debug(artistInfo)
      return {songName: songName, artist: songArtist, image: artistInfo.image, album: artistInfo.name};
    } catch (error) {
      console.error('Error fetching celebrity array:', error);
      return {songName:"",artist:"",image:"",album:""};
    }
  }