import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    location: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
    },
    date: {
      fontSize: 16,
      marginBottom: 8,
    },
    seats: {
      fontSize: 16,
      marginBottom: 16,
    },
    priceContainer: {
      marginBottom: 32,
      alignItems: 'center',
    },
    price: {
      fontSize: 36,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 16,
      marginTop: 8,
    },
    bookingContainer: {
      alignItems: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      padding: 8,
      width: '100%',
      marginBottom: 16,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007bff',
      padding: 12,
      borderRadius: 4,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold',
    },
  });