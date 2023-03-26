import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { styles } from '../components/createReviewStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL} from '@env';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [driverId, setDriverId] = useState('');

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
    const review = {
      rating,
      comment,
      driverId
    };
    try {
      const response = await axios.post(`${process.env.API_URL}/reviews`, review);
      console.log(response.data);
      setRating(0);
      setComment('');
      setDriverId('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Avaliação:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={rating.toString()}
        onChangeText={(text) => setRating(parseInt(text))}
      />

      <Text style={styles.label}>Comentário:</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        value={comment}
        onChangeText={(text) => setComment(text)}
      />

      <Text style={styles.label}>ID do motorista:</Text>
      <TextInput
        style={styles.input}
        keyboardType='numeric'
        value={driverId}
        onChangeText={(text) => setDriverId(text)}
      />

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};

export default ReviewForm;