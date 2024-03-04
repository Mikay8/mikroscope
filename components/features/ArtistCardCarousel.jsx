import React from 'react';
import { View, ScrollView, Image } from 'react-native';
import { Card, Text, Button } from '@ui-kitten/components';
import {layout} from '@/style/layouts/ResultScreenLayout';
const ArtistCardCarousel = ({aristsList}) => {


  return (
    <ScrollView horizontal
    showsHorizontalScrollIndicator={false}
    >
      {aristsList.map((item, index) => (
        <Card key={index} style={layout.card}>
          <View style={layout.cardImageContainer}>
            <Image source={require('@/assets/images/icon.png')} style={layout.cardImage} />
          </View>
          <Text category='s1' style={layout.cardTitle}>{item.name}</Text>
          <Button></Button>
        </Card>
      ))}
    </ScrollView>
  );
};

export default ArtistCardCarousel;
