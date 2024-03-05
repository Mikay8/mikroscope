import React, { useState } from 'react';
import { useColorScheme,StatusBar,SafeAreaView,View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider  } from '@ui-kitten/components';
import MainScreen from '@/front-end/MainScreen';
import {colors} from '@/front-end/style/Colors';

export default function Index() {
  const colorScheme = useColorScheme();
  return (
    <>
    
    
    <ApplicationProvider {...eva}theme={colorScheme === 'dark' ? eva.dark: eva.light} >
    <StatusBar barStyle={colorScheme === 'dark' ? 'light-content': 'dark-content'} />
          <MainScreen/>   
      </ApplicationProvider>
    </>
 

  );
}
