import React from 'react';
import { View, Text } from 'react-native';

const TripScreen = ({ route }) => {
  console.log(route.params.item)
  const { id, departure_location, destination_location, date_time, price } = route.params.item;
  

  return (
    <View>
        <Text>ID: {id}</Text>
        <Text>Embarque: {departure_location}</Text>
        <Text>Destino: {destination_location}</Text>
        <Text>Partida: {date_time}</Text>
        <Text>Total price: {price}</Text>
    </View>
  );
};

export default TripScreen;