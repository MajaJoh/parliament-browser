import React from 'react';
import { View, Button, Image } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (

    
    <><View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button title="Visa ledamöter" onPress={() => navigation.navigate('Ledamöter')} />
    </View><Image
        source={require("../assets/Ålands_Lagting_Logo.png")}
        style={{ width: 100, height: 155, alignSelf: "center", marginBottom: 200 }} /></>
  
  );
  
}

