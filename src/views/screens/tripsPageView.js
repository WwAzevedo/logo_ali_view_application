import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../components/getTripPageStryleSheet';
import { API_URL} from '@env';

const TripsList = () => {
  const [trips, setTrips] = useState([]);

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

  useEffect(() => {
    getTrips();
  }, []);



  const getTrips = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/trips`);
      setTrips(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const renderTrip = ({ item }) => (
    <View style={styles.item}>
      <Text>Embarque: {item.departure_location}</Text>
      <Text>Destino: {item.destination_location}</Text>
      <Text>Partida: {item.date_time}</Text>
      <Text>Total price: {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={trips}
        keyExtractor={item => item.id.toString()}
        renderItem={renderTrip}
      />
    </View>
  );
};

export default TripsList;