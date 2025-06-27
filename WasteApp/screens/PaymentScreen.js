import React from 'react';
import { View, Button, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PaymentScreen({ navigation }) {
  const handlePay = async () => {
    await AsyncStorage.setItem('paid', 'yes');
    await AsyncStorage.removeItem('paid');
    navigation.replace('Videos');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Payment Required to Access Videos</Text>
      <Button title="Pay Now (Simulated)" onPress={handlePay} />
    </View>
  );
}