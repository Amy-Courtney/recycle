import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PreviewScreen() {
    const router = useRouter();
    const { uri } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <Image source={{ uri }} style={styles.image} />
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => router.back()} style={styles.button}>
                    <Text style={styles.text}>Retake</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Confirmed:', uri)} style={styles.button}>
                    <Text style={styles.text}>Confirm</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'black' },
    image: { flex: 1 },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 20,
        backgroundColor: '#000',
    },
    button: {
        padding: 12,
        backgroundColor: '#0A84FF',
        borderRadius: 8,
    },
    text: { color: '#fff', fontSize: 16 },
});
