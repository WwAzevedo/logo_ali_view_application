import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../components/getTripPageStryleSheet';
import { useNavigation } from '@react-navigation/native';

const TripsList = () => {
  const [trips, setTrips] = useState([]);
  const navigation = useNavigation();

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

  const handleTripPress = (item) => {
    navigation.navigate('Get Trip', { item: item });
  };

  const renderTrip = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => handleTripPress(item)}
    >
      <Text>Embarque: {item.departure_location}</Text>
      <Text>Destino: {item.destination_location}</Text>
      <Text>Partida: {item.date_time}</Text>
      <Text>Total price: {item.price}</Text>
    </TouchableOpacity>
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