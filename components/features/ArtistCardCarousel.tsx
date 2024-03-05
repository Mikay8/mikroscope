import React, { useState, useEffect } from 'react';
import { View, ScrollView, Image,Linking } from 'react-native';
import { Card, Text, Button } from '@ui-kitten/components';
import {layout} from '@/style/layouts/ResultScreenLayout';
import ArtistModal from './ArtistModal';
type artistUrlType = {
  name: string;
  image: string;
  spotify: string;
};
interface ArtistComponentProps {
  artistsList: artistUrlType[]
}

const ArtistCardCarousel: React.FC<ArtistComponentProps>= ({artistsList}) => {
  const [modals, setModals] = React.useState<boolean[]>([false,false,false]);
  
  const toggleModal = (index: number) => {
    const updatedModals = [...modals];
    updatedModals[index] = !updatedModals[index];
    setModals(updatedModals);
   
  };
  return (
    <ScrollView horizontal
    showsHorizontalScrollIndicator={false}
    >
      {artistsList.map((item, index) => (
        <>
          <Card key={index} style={layout.card} onPress={e=>toggleModal(index)}>
            <View style={layout.cardImageContainer}>
              <Image src={item.image}  style={layout.cardImage} />
            </View>
            <Text category='s1' style={layout.cardTitle}>{item.name}</Text>
            <Button  onPress={ ()=>{ Linking.openURL(item.spotify)}} />
            <ArtistModal
            key={index}
            visible={modals[index]}
            name={item.name}
            image={item.image}
            spotifyUrl={item.spotify}
            onClose={()=>toggleModal(index)}
          />
          </Card>

        </>
      ))}
       <Card style={layout.card}>
          
          <Text category='s1' style={layout.cardTitle}>Load more...</Text>
          
        </Card>
    </ScrollView>
  );
};

export default ArtistCardCarousel;
