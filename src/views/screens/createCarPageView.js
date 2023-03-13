import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../components/createCarStyleSheet';
import axios from 'axios';

const CarForm = () => {
  const [driverId, setDriverId] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  const handleSubmit = async () => {
    const car = {
      driverId,
      model,
      year,
      color,
      licensePlate
    };
    try {
      const response = await axios.post('https://2737-179-55-95-51.sa.ngrok.io/cars', car);
      console.log(response.data);
      setDriverId('');
      setModel('');
      setYear('');
      setColor('');
      setLicensePlate('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastre um novo carro</Text>
      <TextInput
        style={styles.input}
        placeholder="Driver ID"
        value={driverId}
        onChangeText={(text) => setDriverId(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Model"
        value={model}
        onChangeText={(text) => setModel(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        value={year}
        onChangeText={(text) => setYear(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Color"
        value={color}
        onChangeText={(text) => setColor(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="License Plate"
        value={licensePlate}
        onChangeText={(text) => setLicensePlate(text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CarForm;