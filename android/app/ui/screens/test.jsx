import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TextInput } from 'react-native';
import AddressAutocomplete from '../components/InputAddress/Index';

export default function Test() {


    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },

        // Agrega aquí tus estilos personalizados
    });

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../../assets/gradient.png')}
                style={styles.container}
            >

                <AddressAutocomplete placeHolderText="Where from?" target="origin" />
                {/* ...componentes */}
            </ImageBackground>
        </SafeAreaView>
    );
}