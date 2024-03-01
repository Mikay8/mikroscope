import React from 'react';
import { SafeAreaView, StyleSheet,useColorScheme } from 'react-native';
import { Button, Layout, Text, TopNavigation } from '@ui-kitten/components';
import {colors} from '@/style/Colors';
import {layout} from '@/style/layouts/ResultScreenLayout';

interface FormComponentProps {
  name: string,
  date: string
}

const ResultsScreen:  React.FC<FormComponentProps> = ({ name, date}) => {
  console.log("Results "+name);
  console.log("Results "+date);
  const colorScheme = useColorScheme();
  const containerStyle = ()=>{
    return [layout.container, colorScheme === 'dark' ? colors.darkBackground : colors.lightBackground]
  }
  const textStyle = ()=>{
    return [colorScheme === 'dark' ? colors.darkH1 : colors.lightH1]
  }
  return (
    
      <Layout style={containerStyle()}>
        <Text category='h1' style={textStyle()}>Hello {name} </Text>
        <Text category='s1'>Birthday {date}</Text>
        <Text category='p2'>
          Content below thjfsbvjfsbvjksfbjsbjkjbg
        gnfbgfs,mnm,gfn,fmn, headerjgkjkrbgjkrbwjkjk
        gnjkrngrjwgnrkjwgnjkrjgnrkwgntjkrwngkjwrtkkj
        bjkrwgjkgjkrbgkjrbwkgjbtkrwjgbtjkrwbjgkrtktbjkr
        gtjkrwghtjkrwghjkthwgkjrthgkjrthwkjgwthrgjkrtgr
        gjkwtbgwkrjhjkhgjkrtwhgjkrtwhjkrghkt gtjkrwghtjkr
        </Text>
      </Layout>
   
  );
};


export default ResultsScreen;
