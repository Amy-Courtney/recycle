import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import { Video } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function VideosScreen({ navigation, route }) {
  const [videos, setVideos] = useState([]);
  const [paid, setPaid] = useState(false);

  useEffect(() => {
    // Check if user has paid
    AsyncStorage.getItem('paid').then(value => {
      if (value === 'yes') {
        setPaid(true);
        fetch('http://127.0.0.1:5000/api/videos')
          .then(res => res.json())
          .then(setVideos)
          .catch(() => setVideos([]));
      } else {
        setPaid(false);
      }
    });
  }, []);

  if (!paid) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>You must pay to access videos.</Text>
        <Button title="Go to Payment" onPress={() => navigation.replace('Payment')} />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Text style={{ fontSize: 24, marginBottom: 10 }}>Available Videos</Text>
      <FlatList
        data={videos}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>{item.title}</Text>
            <Video
              source={{ uri: `http://127.0.0.1:5000/api/video/${item.filename}` }}
              useNativeControls
              resizeMode="contain"
              style={{ width: '100%', height: 200 }}
            />
          </View>
        )}
      />
      <Button title="Back to Home" onPress={() => navigation.navigate('Home', { username: route.params.username, password: route.params.password })} />
    </View>
  );
}