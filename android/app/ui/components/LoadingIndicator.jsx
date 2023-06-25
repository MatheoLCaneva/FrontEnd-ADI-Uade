import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

export default function LoadingIndicator() {
    const styles = StyleSheet.create({
        loadingContainer: {
            ...StyleSheet.absoluteFill,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
}
