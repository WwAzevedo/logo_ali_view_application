import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';
import axios from 'axios';
import { styles } from '../components/bookingPageStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL} from '@env';

const BookingsScreen = () => {
  const [bookings, setBookings] = useState([]);

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
    getBookings();
  }, []);

  const getBookings = async () => {
    try {
      const response = await axios.get(`${process.env.API_URL}/bookings`);
      setBookings(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Trip ID: {item.trip_id}</Text>
      <Text>User ID: {item.user_id}</Text>
      <Text>Number of seats booked: {item.num_seats_booked}</Text>
      <Text>Total price: {item.total_price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={bookings}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default BookingsScreen;