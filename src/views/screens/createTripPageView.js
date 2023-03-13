import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { styles } from '../components/createTripStyleSheet';
import axios from 'axios';

const TripForm = () => {
  const [driverId, setDriverId] = useState('');
  const [departureLocation, setDepartureLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [availableSeats, setAvailableSeats] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [carId, setCarId] = useState('');

  const handleSubmit = async () => {
    const trip = {
      driverId,
      departureLocation,
      destinationLocation,
      dateTime,
      availableSeats,
      price,
      description,
      carId,
    };

    try {
      const response = await axios.post('https://2737-179-55-95-51.sa.ngrok.io/trips', trip);
      console.log(response.data);

      setDriverId('');
      setDepartureLocation('');
      setDestinationLocation('');
      setDateTime('');
      setAvailableSeats('');
      setPrice('');
      setDescription('');
      setCarId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Driver ID:</Text>
      <TextInput style={styles.input} value={driverId} onChangeText={setDriverId} />

      <Text style={styles.label}>Departure Location:</Text>
      <TextInput style={styles.input} value={departureLocation} onChangeText={setDepartureLocation} />

      <Text style={styles.label}>Destination Location:</Text>
      <TextInput style={styles.input} value={destinationLocation} onChangeText={setDestinationLocation} />

      <Text style={styles.label}>Date and Time:</Text>
      <TextInput style={styles.input} value={dateTime} onChangeText={setDateTime} />

      <Text style={styles.label}>Available Seats:</Text>
      <TextInput style={styles.input} value={availableSeats} onChangeText={setAvailableSeats} />

      <Text style={styles.label}>Price:</Text>
      <TextInput style={styles.input} value={price} onChangeText={setPrice} />

      <Text style={styles.label}>Description:</Text>
      <TextInput style={[styles.input, styles.multiline]} multiline={true} numberOfLines={4} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Car ID:</Text>
      <TextInput style={styles.input} value={carId} onChangeText={setCarId} />

      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default TripForm;