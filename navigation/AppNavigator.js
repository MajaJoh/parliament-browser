import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MemberListScreen from '../screens/MemberListScreen';
import MemberDetailScreen from '../screens/MemberDetailScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen name="Ålands Lagting" component={HomeScreen} />   
      <Stack.Screen name="Ledamöter" component={MemberListScreen} />   
      <Stack.Screen name="Detaljer" component={MemberDetailScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}