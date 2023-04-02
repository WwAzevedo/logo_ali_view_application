import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import axios from 'axios';
import { styles } from '../components/tripDescrtionPageStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TripScreen = ({ route }) => {
  const [numSeats, setNumSeats] = useState('');
  const { id, departure_location, destination_location, date_time, price, description, available_seats } = route.params.item;
  
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

  const createBooking = async (tripId, userId, numSeatsBooked, totalPrice) => {
    try {
      const response = await axios.post(`${process.env.API_URL}/bookings`, {
        trip_id: tripId,
        user_id: userId,
        num_seats_booked: numSeatsBooked,
        total_price: totalPrice,
      });
      return response.data;
    } catch (err) {
      console.log(err)
      throw new Error('Não foi possível realizar a reserva. Por favor, tente novamente mais tarde.');
    }
  };

  const updateAvailableSeats = async (id, startLocation, endLocation, startTime, availableSeats, price) => {
    try {
      const response = await axios.patch(`${process.env.API_URL}/trips/${id}`, {
        startLocation: startLocation,
        endLocation: endLocation,
        startTime: startTime,
        availableSeats: availableSeats,
        price: price,
      });
      return response.data;
    } catch (err) {
      console.log(err)
      throw new Error('Não foi possível atualizar o número de assentos disponíveis. Por favor, tente novamente mais tarde.');
    }
  };

  const handleBooking = async () => {
    if (numSeats === '') {
      Alert.alert('Erro', 'Por favor, informe o número de assentos que deseja reservar.');
    } else {
      try {
        const user = await AsyncStorage.getItem('user');
        const userInfo = JSON.parse(user)
        const userId = userInfo.id;
        const totalPrice = numSeats * price;
        const available_seats = available_seats - numSeats
        await createBooking(id, userId, numSeats, totalPrice);
        await updateAvailableSeats(id, departure_location, destination_location, date_time, available_seats, price);
        Alert.alert('Sucesso', 'Reserva realizada com sucesso!');
      } catch (err) {
        Alert.alert('Erro', err.message);
      }
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>Viagem</Text>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{id}</Text>
        <Text style={styles.label}>Embarque:</Text>
        <Text style={styles.value}>{departure_location}</Text>
        <Text style={styles.label}>Destino:</Text>
        <Text style={styles.value}>{destination_location}</Text>
        <Text style={styles.label}>Partida:</Text>
        <Text style={styles.value}>{date_time}</Text>
        <Text style={styles.label}>Assentos Disponíveis:</Text>
        <Text style={styles.value}>{available_seats}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.title}>Preço</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.bookingContainer}>
        <Text style={styles.label}>Número de Assentos:</Text>
        <TextInput
          style={styles.input}
          keyboardType='numeric'
          value={numSeats}
          onChangeText={(text) => setNumSeats(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleBooking}>
          <Text style={styles.buttonText}>Reservar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


export default TripScreen;
