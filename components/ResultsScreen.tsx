import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {colors} from '@/style/Colors';
import {layout} from '@/style/layouts/ResultScreenLayout';
import ArtistCardCarousel from '@/components/features/ArtistCardCarousel'
interface FormComponentProps {
  name: string,
  date: string
}

const ResultsScreen:  React.FC<FormComponentProps> = ({ name, date}) => {
  console.log("Results "+name);
  console.log("Results "+date);
  const artistLists = [
    { title: 'Card 1', description: 'Description for Card 1' },
    { title: 'Card 2', description: 'Description for Card 2' },
    { title: 'Card 3', description: 'Description for Card 3' },
    { title: 'Card 4', description: 'Description for Card 3' },
  ];
  return (
    
      <Layout style={layout.container}>
        <Text category='h1' >Hello {name} </Text>
        <Text category='s1'>Birthday {date}</Text>
        <Text category='s1'>You are a scorpio!</Text>
        <Text category='s1'>Here are some arists...</Text>
        <Layout style={layout.scrollHeight}>
          <ArtistCardCarousel aristsList={artistLists}/>
        </Layout>
        
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
