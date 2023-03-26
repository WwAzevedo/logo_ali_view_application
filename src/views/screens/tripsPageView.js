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
    <ListItem bottomDivider>
      <ListItem.Content>
        <ListItem.Title>{item.startLocation} - {item.endLocation}</ListItem.Title>
        <ListItem.Subtitle>{item.startTime}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
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