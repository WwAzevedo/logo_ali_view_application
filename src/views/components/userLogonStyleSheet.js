import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16
    },
    input: {
      width: '80%',
      height: 40,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      paddingHorizontal: 8,
      marginBottom: 16
    },
    button: {
      backgroundColor: '#007bff',
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 4
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16
    }
  });