import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';
import { useIsFocused } from '@react-navigation/native';



export default function BookingsHome() {
    const [isLoading, setIsLoading] = useState(false);
    const [reserves, setReserves] = useState([]);
    const user = useSelector(state => state.user.user)
    const isFocused = useIsFocused()


    useEffect(() => {
        if (isFocused) {
            // setIsLoading(true);
            fetchBookings()
        }
    }, [isFocused])

    const fetchBookings = async () => {
        try {
            const response = await axios.get(`https://backend-adi-uade.onrender.com/reservations/user/${user.email}`)
            if (response.data.status === 200) {
                setReserves(response.data.data.docs)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 21,
            marginTop: 18
        },

        // Agrega aquí tus estilos personalizados
    }, []);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >

            </ImageBackground>
        </SafeAreaView>
    );
}