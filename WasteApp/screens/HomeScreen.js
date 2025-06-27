import React, { useRef, useState } from 'react';
import { View, Button, Image, Text, StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';

export default function HomeScreen({ navigation, route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [location, setLocation] = useState(null);
  const [result, setResult] = useState('');
  const cameraRef = useRef(null);

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const pic = await cameraRef.current.takePictureAsync();
      setPhoto(pic.uri);
      classifyDirt(pic.uri);
    }
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc.coords);
  };

  // Send image to backend for classification
  const classifyDirt = async (uri) => {
    let formData = new FormData();
    formData.append('image', {
      uri,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    try {
      const res = await fetch('http://127.0.0.1:5001/classify', {
        method: 'POST',
        headers: {
          'Username': route.params.username,
          'Password': route.params.password,
        },
        body: formData,
      });
      const data = await res.json();
      setResult(JSON.stringify(data));
    } catch {
      setResult('Could not connect to backend.');
    }
  };

  if (hasPermission === null) return <View />;
  if (hasPermission === false) return <Text>No access to camera</Text>;

  return (
    <View style={styles.container}>
      <Camera ref={cameraRef} style={styles.camera} />
      <Button title="Snap Dirt" onPress={takePicture} />
      {photo && <Image source={{ uri: photo }} style={styles.image} />}
      <Button title="Show Location" onPress={getLocation} />
      {location && <Text>Lat: {location.latitude}, Lng: {location.longitude}</Text>}
      {result ? <Text>Classification: {result}</Text> : null}
      <Button title="Go to Videos" onPress={() => navigation.navigate('Videos', { username: route.params.username, password: route.params.password })} />
      <Button title="About Us" onPress={() => navigation.navigate('About')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  camera: { width: '100%', height: 300, marginBottom: 10 },
  image: { width: 200, height: 200, marginVertical: 10, alignSelf: 'center' },
});