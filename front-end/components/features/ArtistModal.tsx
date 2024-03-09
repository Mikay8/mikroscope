import React from 'react';
import { Modal, Text, Button,Card } from '@ui-kitten/components';
import { View, ScrollView, Image,Linking } from 'react-native';
import {layout} from '@/front-end/style/layouts/ResultScreenLayout';

interface ArtistModalProps {
  visible: boolean;
  name: string;
  image: string;
  spotifyUrl: string;
  topSongs: string[];
  onClose: () => void;
}

const ArtistModal: React.FC<ArtistModalProps> = ({ visible, name, image,topSongs, spotifyUrl, onClose }) => {
  const handleOpenSpotify = () => {
    Linking.openURL(spotifyUrl);
  };

  return (
    <Modal visible={visible} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onBackdropPress={onClose}>
      
          <Card disabled={true} style={layout.modalCard}>
              
              <View style={layout.modalCardImageContainer}>
                <Image source={{ uri: image }}   style={layout.modalCardImage} />
              </View>
  
                  <Text category="h4" style={{textAlign:'center', paddingBottom:10}}>{name}</Text>
                    {topSongs.map((item, index) => (
                      <Text key={index} style={{textAlign:'center'}} category="s1">
                        {topSongs[index]}
                      </Text>
                    ))}
                  <Button onPress={handleOpenSpotify} style={layout.modalCardBtn} >Open in Spotify</Button>
          
          </Card>
     
    </Modal>
  );
};

export default ArtistModal;
