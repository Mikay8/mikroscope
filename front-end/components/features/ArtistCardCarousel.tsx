import React, { useState, useEffect,Fragment,FC } from 'react';
import { View, ScrollView, Image,Linking } from 'react-native';
import { Card, Text, Button } from '@ui-kitten/components';
import {layout} from '@/front-end/style/layouts/ResultScreenLayout';
import ArtistModal from './ArtistModal';
type artistType = {
  name: string;
  image: string;
  spotify: string;
  topSongs: string[];
};
interface ArtistComponentProps {
  artistsList: artistType[]
}

const ArtistCardCarousel: FC<ArtistComponentProps>= ({artistsList}) => {
  const [modals, setModals] = React.useState<boolean[]>(Array.from({ length: artistsList.length }, () => false));
  
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
        <Fragment key={index}>
          <Card key={index} style={layout.card} onPress={e=>toggleModal(index)}>
            <View style={layout.cardImageContainer}>
              <Image src={item.image}  style={layout.cardImage} />
            </View>
            <Text category='s1' style={layout.cardTitle}>{item.name}</Text>
            <Button  onPress={ ()=>{ Linking.openURL(item.spotify)}} />
            <ArtistModal
            key={`modal-${index}`} 
            visible={modals[index]}
            name={item.name}
            image={item.image}
            topSongs={item.topSongs}
            spotifyUrl={item.spotify}
            onClose={()=>toggleModal(index)}
          />
          </Card>
        </Fragment>
      ))}
       {/* <Card style={layout.card}>
          
          <Text category='s1' style={layout.cardTitle}>Load more...</Text>
          
        </Card> */}
    </ScrollView>
  );
};

export default ArtistCardCarousel;
