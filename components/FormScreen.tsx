import React, { useState } from 'react';
import { Layout, Input, Button,Datepicker, DatepickerProps, } from '@ui-kitten/components';
import { Image } from 'react-native';
import {colors} from '@/style/Colors';
import {layout} from '@/style/layouts/FormScreenLayout';

interface FormComponentProps {
    onSubmit: (name: string, date: Date) => void;
  }
const FormScreen:  React.FC<FormComponentProps> = ({ onSubmit}) => {
  const now = new Date();
  const min = new Date(1900, now.getMonth(), now.getDate() - 1);
  const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date>(now);

  const handleSubmit = () => {
    onSubmit(name, date);

    //setName("");
  };
  
  return (
    <Layout style={layout.container }>
      <Image source={require('@/assets/images/favicon.png')} />
   

      <Input
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={layout.input}
      />

      <Datepicker
        date={date}
        style={layout.datepicker}
        onSelect={(nextDate) => setDate(nextDate)}
        placeholder='Pick Date'
        placement='top'    
        min={min} // Minimum selectable date (January 1, 1900)
        max={tomorrow} // Maximum selectable date today
      />

      <Button onPress={handleSubmit} style={layout.button}>Submit</Button>
    </Layout>
  );
};

export default FormScreen;
