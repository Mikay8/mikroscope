import React from 'react';
import { View, ScrollView, Image,Linking } from 'react-native';
import { Card, Text, Button } from '@ui-kitten/components';
import {layout} from '@/style/layouts/ResultScreenLayout';
type artistUrlType = {
  name: string;
  image: string;
  spotify: string;
};
interface ArtistComponentProps {
  artistsList: artistUrlType[]
}

const ArtistCardCarousel: React.FC<ArtistComponentProps>= ({artistsList}) => {

  return (
    <ScrollView horizontal
    showsHorizontalScrollIndicator={false}
    >
      {artistsList.map((item, index) => (
        <Card key={index} style={layout.card}>
          <View style={layout.cardImageContainer}>
            <Image src={item.image}  style={layout.cardImage} />
          </View>
          <Text category='s1' style={layout.cardTitle}>{item.name}</Text>
          <Button  onPress={ ()=>{ Linking.openURL(item.spotify)}} />
        
        </Card>
      ))}
    </ScrollView>
  );
};

export default ArtistCardCarousel;
