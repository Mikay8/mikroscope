import React from 'react';
import { Modal, Text, Button } from '@ui-kitten/components';
import { View, ScrollView, Image,Linking } from 'react-native';

interface ArtistModalProps {
  visible: boolean;
  name: string;
  image: string;
  spotifyUrl: string;
  onClose: () => void;
}

const ArtistModal: React.FC<ArtistModalProps> = ({ visible, name, image, spotifyUrl, onClose }) => {
  const handleOpenSpotify = () => {
    Linking.openURL(spotifyUrl);
  };

  return (
    <Modal visible={visible} backdropStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} onBackdropPress={onClose}>
      <View style={{ padding: 16, alignItems: 'center' }}>
        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginBottom: 16 }} />
        <Text category="h4">{name}</Text>
        <Button onPress={handleOpenSpotify}>Open in Spotify</Button>
      </View>
    </Modal>
  );
};

export default ArtistModal;