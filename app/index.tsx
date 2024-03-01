import React, { useState } from 'react';
import { useColorScheme } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider  } from '@ui-kitten/components';
import MainScreen from '@/components/MainScreen';
import {colors} from '@/style/Colors';

export default function Index() {
  const colorScheme = useColorScheme();
  return (

  <ApplicationProvider {...eva} theme={colorScheme === 'dark' ? eva.dark: eva.light} >
      <MainScreen/>
    
            
        </ApplicationProvider>

  );
}
