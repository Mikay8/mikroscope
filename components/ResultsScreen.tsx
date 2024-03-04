import React, { useState, useEffect } from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {colors} from '@/style/Colors';
import {layout} from '@/style/layouts/ResultScreenLayout';
import ArtistCardCarousel from '@/components/features/ArtistCardCarousel'
import { getCelebrityArray } from './helper/getCelebrityArray';

interface FormComponentProps {
  name: string,
  date: string,
  starSign: string
}
type celebrityType = {
  name: string;
  image: string;
  spotify: string;
};
const ResultsScreen:  React.FC<FormComponentProps> = ({ name, date, starSign}) => {
  const [celebrityList, setCelebrityList] = useState<Array<celebrityType>>([]);
  useEffect(() => {
    const fetchCelebrities = async () => {
      try {
        const celebList = await getCelebrityArray(starSign.toLowerCase());
        
        setCelebrityList(celebList);
        console.debug(celebrityList);
        return celebList;
      } catch (error) {
        console.error('Error fetching top tracks:', error);
      }
    };
    
    fetchCelebrities();
    
  }, [starSign]);
  
  return (
    
      <Layout style={layout.container}>
        <Text category='h1' >Hello {name} </Text>
        <Text category='s1'>Birthday {date}</Text>
        <Text category='s1'>You are a {starSign}!</Text>
        <Text category='s1'>Here are some {starSign.toLowerCase()} arists...</Text>
        {
          celebrityList&&
          <Layout style={layout.scrollHeight}>
          <ArtistCardCarousel aristsList={celebrityList}/>
        </Layout>
        }
        
        
        <Text category='s1'>Here are is your song of the day...</Text>
        <Text category='p2'>
          Content below thjfsbvjfsbvjksfbjsbjkjbg
        </Text>
        <Text category='p2'>
          Content below thjfsbvjfsbvjksfbjsbjkjbg
        </Text>
      </Layout>
   
  );
};


export default ResultsScreen;
