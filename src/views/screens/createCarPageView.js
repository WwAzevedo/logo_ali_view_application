import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from '../components/createCarStyleSheet';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CarForm = () => {
  const [driverId, setDriverId] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [color, setColor] = useState('');
  const [licensePlate, setLicensePlate] = useState('');

  axios.interceptors.request.use(
    async (config) => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const handleSubmit = async () => {

    const user = await AsyncStorage.getItem('user');
    const userInfo = JSON.parse(user)

    const token = await AsyncStorage.getItem('token');
    const response = await axios.get(`${process.env.API_URL}/cars/driver/${userInfo.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const driverId = userInfo.id

    const car = {
      driverId,
      model,
      year,
      color,
      licensePlate
    };
    try {
      const response = await axios.post(`${process.env.API_URL}/cars`, car);
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