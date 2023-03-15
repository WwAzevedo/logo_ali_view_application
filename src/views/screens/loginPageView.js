import React, { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';
import axios from 'axios';
import { styles } from '../components/loginPageStyleSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://360e-179-55-95-51.sa.ngrok.io/login';

const LoginScreen = () =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post(API_URL, { email, password });
      const { token, user } = response.data;
        console.log(response.data)
      // Armazena o token e o usuário no armazenamento local
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));

      // Navega para a tela de boas-vindas
      //navigation.navigate('Welcome');
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Email ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Entrar" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
