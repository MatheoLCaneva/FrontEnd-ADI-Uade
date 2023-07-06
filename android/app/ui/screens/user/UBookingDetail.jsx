import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';

export default function BookingDetail() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },

        // Agrega aquí tus estilos personalizados
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                {/* ...componentes */}
            </ImageBackground>
        </SafeAreaView>
    );
}