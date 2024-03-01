import React, { useState } from 'react';
import { Layout, Input, Button,Datepicker, DatepickerProps, } from '@ui-kitten/components';
import { Image } from 'react-native';
import { StyleSheet,useColorScheme } from 'react-native';
import {colors} from '@/style/Colors';
import {layout} from '@/style/layouts/FormScreenLayout';

interface FormComponentProps {
    onSubmit: (name: string, date: string) => void;
  }
const FormScreen:  React.FC<FormComponentProps> = ({ onSubmit}) => {
  const now = new Date();
  const min = new Date(1900, now.getMonth(), now.getDate() - 1);
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date>(now);
  const colorScheme = useColorScheme();
  const handleSubmit = () => {
    onSubmit(name, date.toLocaleDateString());

    //setName("");
  };
  
  const containerStyle = ()=>{
    return [layout.container, colorScheme === 'dark' ? colors.darkBackground : colors.lightBackground]
  }
  const InputStyle = ()=>{
    return [layout.input, colorScheme === 'dark' ? colors.darkInput : colors.lightInput]
  }
  const DatepickerStyle = ()=>{
    return [layout.datepicker, colorScheme === 'dark' ? colors.darkDatepicker : colors.lightDatepicker]
  }
  const ButtonStyle = ()=>{
    return [layout.button, colorScheme === 'dark' ? colors.darkButtonForm : colors.lightButtonForm]
  }

  return (
    <Layout style={containerStyle()}>
      <Image source={require('@/assets/images/favicon.png')} />
   

      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={InputStyle()}
      />

      <Datepicker
        date={date}
        style={DatepickerStyle()}
        onSelect={(nextDate) => setDate(nextDate)}
        placeholder='Pick Date'
        placement='bottom'    
        min={min} // Minimum selectable date (January 1, 1900)
        max={tomorrow} // Maximum selectable date today
      />

      <Button onPress={handleSubmit} style={ButtonStyle()}>Submit</Button>
    </Layout>
  );
};

export default FormScreen;
