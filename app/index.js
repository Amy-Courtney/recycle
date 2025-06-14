// app/index.js
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to WasteTransformerV2</Text>
            <Link href="/camera" style={{ fontSize: 18, color: 'blue' }}>
                📷 Open Camera
            </Link>
        </View>
    );
}
