import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import BookingsScreen from '../screens/bookingsPageView';
import CarForm from '../screens/createCarPageView';
import ReviewForm from '../screens/createReviewPageView';
import TripForm from '../screens/createTripPageView';
import UserForm from '../screens/logonPageView';
import LoginScreen from '../screens/loginPageView';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function HomeTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Login"
      activeColor="#ffffff"
      inactiveColor="#3e2465"
      barStyle={{ backgroundColor: '#007bff' }}

    >
      <Tab.Screen name="Reviews" component={ReviewForm} />
      <Tab.Screen name="Trips" component={TripForm} />
      <Tab.Screen name="Insert a Car" component={CarForm} />
      <Tab.Screen name="Logon" component={UserForm} />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Login" component={LoginScreen} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Logo Ali" component={HomeTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;