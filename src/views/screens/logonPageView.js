import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import axios from 'axios';
import { styles } from '../components/userLogonStyleSheet';

const UserForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDriver, setIsDriver] = useState(false);

  const handleSubmit = async () => {
    const user = {
      name,
      email,
      password,
      isDriver
    };
    console.log(user)
    try {
      const response = await axios.post('https://5a83-186-229-196-110.sa.ngrok.io/users', user);
      console.log(response.data);
      setName('');
      setEmail('');
      setPassword('');
      setIsDriver(false);
      
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome:</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <Text style={styles.label}>Email:</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      <Text style={styles.label}>Senha:</Text>
      <TextInput
        style={styles.input}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />

      <Button title="Salvar" onPress={handleSubmit} />
    </View>
  );
};


export default UserForm;
