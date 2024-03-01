import React, { useState } from 'react';
import { StyleSheet,useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, Layout, Text,TopNavigation, Button  } from '@ui-kitten/components';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ResultsScreen from './ResultsScreen';
import FormScreen from './FormScreen';
import {colors} from '@/style/Colors';
import {layout} from '@/style/layouts/MainScreenLayout';

export default function MainScreen() {
  
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [showResult, setShowResult] = useState(false);
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();
  const handleSubmit = (submittedName: string, submittedDate: string) => {
    // Handle form submission
    setName(submittedName);
    setDate(submittedDate);
    
    if((submittedName.length>0) && submittedDate){
      setShowResult(true);
    }else{
      setShowResult(false);
    }

  };
  const handleBackBtn = () => {
    // Handle button press
    console.log('Button pressed');
    setShowResult(false);
  };
  
  const BackAction = (): React.ReactElement => (
        <Button onPress={handleBackBtn}>Back</Button>
  );
  const navStyle = ()=>{
    return [layout.topNav, colorScheme === 'dark' ? colors.darkBackground : colors.lightBackground,{ paddingTop: insets.top }]
  }
  const containerStyle = ()=>{
    return [layout.container, 
      colorScheme === 'dark' ? colors.darkBackground : colors.lightBackground,//background colors
      {marginBottom: -insets.bottom, marginTop: -insets.top,}] //extends the colors 
  }
  return (
   <>
   
          <Layout style={containerStyle()}>
            
              {
              showResult 
              ?
              <Layout >
                
                    <TopNavigation style={navStyle()}alignment='start' accessoryLeft={BackAction}/>
                    <ResultsScreen name={name} date={date}/>
                    
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

