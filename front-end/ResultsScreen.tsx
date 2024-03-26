import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image,Linking } from 'react-native';
import { Layout, Text, Spinner } from '@ui-kitten/components';
import {colors} from '@/front-end/style/Colors';
import {layout} from '@/front-end/style/layouts/ResultScreenLayout';
import ArtistCardCarousel from '@/front-end/components/features/ArtistCardCarousel'
import { getArtistArray, getSong } from './components/helper/getCelebrityArray';

interface FormComponentProps {
  name: string,
  date: string,
  starSign: string
}
type celebrityType = {
  name: string;
  image: string;
  spotify: string;
  topSongs: string[];
};
type songType = {
    
  songName: string;
  artist: string;
  image: string;
  album: string;
};
const ResultsScreen:  React.FC<FormComponentProps> = ({ name, date, starSign}) => {
  const [celebrityList, setCelebrityList] = useState<Array<celebrityType>>([]);
  const [song, setSong] = useState<songType>();
  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
       
        const celebList = await getArtistArray(starSign.toLowerCase(),0,5);
        
        setCelebrityList(celebList);
        const randIdx = Math.floor(Math.random() * (celebList.length));
        const songInfo = await getSong(celebList[randIdx].topSongs[0], celebList[randIdx].name);
        setSong(songInfo);
        return celebList;
      } catch (error) {
        console.error('RESULTS: Error fetching:', error);
      }
    };
    
    fetchCelebrities();
    
  }, [starSign]);
  
  return (
    
      <Layout style={layout.container}>
        <Text category='h1' >Hello {name} </Text>
        <Text category='s1'>Birthday {date}</Text>
        <Text category='s1'>You are a {starSign}!</Text>
        <Text category='s1'>Here are your suggested artists for the day...</Text>
        {
          celebrityList.length>1?
            <Layout style={layout.scrollHeight}>
              <ArtistCardCarousel artistsList={celebrityList}/>
            </Layout>
        :   <Spinner size='giant'/>
        }
        <Image src={song?.image}  />
        
        <Text category='s1'>Here are is your song of the day...</Text>
        <Text category='p2'>
          {song?.songName}
        </Text>
        
        <Text category='p2'>
          by
        </Text>
        <Text category='p2'>
          {song?.artist}
        </Text>
        <Text category='p2'>
          {song?.album}
        </Text>
      </Layout>
   
  );
};


export default ResultsScreen;
