import React from 'react';
import { Layout, Text } from '@ui-kitten/components';
import {colors} from '@/style/Colors';
import {layout} from '@/style/layouts/ResultScreenLayout';

interface FormComponentProps {
  name: string,
  date: string
}

const ResultsScreen:  React.FC<FormComponentProps> = ({ name, date}) => {
  console.log("Results "+name);
  console.log("Results "+date);

  return (
    
      <Layout style={layout.container}>
        <Text category='h1' >Hello {name} </Text>
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
