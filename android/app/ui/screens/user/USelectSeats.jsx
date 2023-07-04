import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import BackArrow from '../../components/BackArrow';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ButtonPrimary from '../../components/ButtonPrimary';
import axios from 'axios';

export default function SelectSeats() {
    const movie = useSelector(state => state.client.movie);


    const navigation = useNavigation()
    const handleGoBack = () => {
        navigation.goBack();
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 21,
            marginTop: 18
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 14,
            letterSpacing: 2,
            textAlign: 'center'
        },
        subtitle: {
            color: 'white',
            fontSize: 18,
            marginTop: 34,
            fontWeight: '600',
        },
        dateContainer: {
            flexDirection: 'row',
            marginTop: 10,
        },
        date: {
            color: 'white',
            fontSize: 16,
            marginLeft: 10,
            textAlign: 'center'
        },
        hourContainer: {
            flexDirection: 'row',
            marginTop: 10
        },
        hour: {
            color: 'white',
            fontSize: 16,
            marginLeft: 10,
            textAlign: 'center'
        },
        entradasContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10
        },
        cantidadContainer: {
            flexDirection: 'row',
            alignItems: 'center'
        },
        cantidad: {
            color: 'white',
            fontSize: 16,
            marginHorizontal: 10,
            textAlign: 'center'
        },
        boton: {
            backgroundColor: 'white',
            padding: 5,
            borderRadius: 5,
            marginHorizontal: 5
        },
        botonText: {
            color: 'black',
            fontSize: 16,
            paddingHorizontal: 5
        }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <BackArrow onPress={handleGoBack} />
                <Text style={styles.title}>{movie.title.toUpperCase()}</Text>
                <View>
                    <Text style={styles.subtitle}>Fecha: </Text>
                    <Text style={styles.subtitle}>Hora: </Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
