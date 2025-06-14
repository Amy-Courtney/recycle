import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import CameraView from './CameraView';

export default function App() {
    const [photo, setPhoto] = useState(null);

    return (
        <View style={{ flex: 1 }}>
            {!photo ? (
                <CameraView onPictureTaken={setPhoto} />
            ) : (
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={{ uri: photo.uri }} style={{ width: 300, height: 400 }} />
                    <Text style={{ marginTop: 10 }}>Image captured!</Text>
                </View>
            )}
        </View>
    );
}
