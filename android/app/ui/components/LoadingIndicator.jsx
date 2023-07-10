import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text } from 'react-native-elements';

export default function LoadingIndicator() {
    const styles = StyleSheet.create({
        loadingContainer: {
            // backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
            // marginTop: '100%'
        },
    });

    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#ffffff" />
        </View>
    );
}
