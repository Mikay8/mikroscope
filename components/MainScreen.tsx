import React, { useState, useEffect } from 'react';
import {Dimensions} from 'react-native';
import { Layout,TopNavigation, Button  } from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ResultsScreen from './ResultsScreen';
import FormScreen from './FormScreen';
import {colors} from '@/style/Colors';
import {layout} from '@/style/layouts/MainScreenLayout';
import { getStarSign } from './helper/getStarSigns';
import { getCelebrityArray } from './helper/getCelebrityArray';
import {getTopTracks, getArtistId, getArtistUrl} from '@/services/spotifyService'


export default function MainScreen() {
  const windowDimensions = Dimensions.get('window');
  const now = new Date();
  const [name, setName] = useState('');
  const [starSign, setStarSign] = useState('');
  const [date, setDate] = useState<Date>(now);
  const [showResult, setShowResult] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSubmit = (submittedName: string, submittedDate: Date) => {
    // Handle form submission
    setName(submittedName);
    setDate(submittedDate);
    setStarSign(getStarSign(submittedDate));
    if((submittedName.length>0) && submittedDate){
      setShowResult(true);
    }else{
      setShowResult(false);
    }
  };
  const handleBackBtn = () => {
    // Handle button press
    setShowResult(false);
  };
  
  const BackAction = (): React.ReactElement => (
        <Button onPress={handleBackBtn}>Back</Button>
  );
  const navStyle = ()=>{
    return [layout.topNav, { paddingTop: insets.top }]
  }
  const containerStyle = ()=>{
    return [layout.container, 
      {marginBottom: -insets.bottom, marginTop: -insets.top,}] //extends the colors 
  }
  const maxWidthcontainerStyle = ()=>{
    return [ {width: windowDimensions.width,}] //extends the colors 
  }
  return (
   <>
   
          <Layout style={containerStyle()}>
            
              {
              showResult 
              ?
              <Layout >
                 <Layout style={maxWidthcontainerStyle()} >
                    <TopNavigation style={navStyle()}alignment='start' accessoryLeft={BackAction}/>
                  </Layout >
                    
                    <ResultsScreen name={name} date={date.toLocaleDateString()} starSign={starSign}/>
                    
              </Layout> 
              :
              <Layout style={containerStyle()} >
            
                  <FormScreen onSubmit={handleSubmit} />
                
              </Layout> 
              }

          </Layout>
          
   </>


  );
}

