import {  StyleSheet } from 'react-native';
export const layout = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center'
    },
    scrollHeight: {
      height:230
    },
    card: {
      width: 200,
      margin: 10,
      height:200,
      alignItems: 'center', // Center items horizontally
      justifyContent: 'center', // Center the image vertically
    },
    cardImageContainer: {
      borderRadius: 60, // Make the container circular
      overflow: 'hidden', // Clip the image to the container's border
      alignItems: 'center', // Center the image horizontally
      justifyContent: 'center', // Center the image vertically
      width: 'auto',
      height: 100,
      
      marginBottom: 10,
    },
    cardImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover', // Make sure the image covers the entire container
    
    },
    cardTitle: {
      textAlign: 'center', // Center the text horizontally
      marginBottom: 5,
    },
    cardDescription: {
      textAlign: 'center', // Center the text horizontally
    },
  });