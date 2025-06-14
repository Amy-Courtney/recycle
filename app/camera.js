// app/camera.js
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
    const cameraRef = useRef(null);
    const [hasPermission, setHasPermission] = useState(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            router.push({ pathname: '/preview', params: { uri: photo.uri } });
        }
    };

    if (hasPermission === null) return <Text>Requesting camera permission...</Text>;
    if (hasPermission === false) return <Text>No access to camera</Text>;

    return (
        <View style={styles.container}>
            <Camera ref={cameraRef} style={styles.camera} />
            <TouchableOpacity onPress={takePicture} style={styles.captureButton}>
                <Text style={styles.buttonText}>📸 Capture</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    camera: { flex: 1 },
    captureButton: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        backgroundColor: '#0A84FF',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 10,
    },
    buttonText: { color: '#fff', fontSize: 18 },
});
