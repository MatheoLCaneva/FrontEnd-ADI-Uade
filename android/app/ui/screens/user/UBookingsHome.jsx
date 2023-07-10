import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CardBooking from '../../components/cards/CardBookings';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import { setReserve } from '../../../redux/store';
import LoadingIndicator from '../../components/LoadingIndicator';


export default function BookingsHome() {
    const [isLoading, setIsLoading] = useState(false);
    const [reserves, setReserves] = useState([]);
    const user = useSelector(state => state.user)
    const isFocused = useIsFocused()
    const navigation = useNavigation()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isFocused) {
            setIsLoading(true);
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
        setIsLoading(false)

    }

    const handleSelectBooking = (booking) => {
        dispatch(setReserve(booking))
        navigation.navigate(NavigatorConstant.USER_BOOKINGS.BOOKING)
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

                {isLoading ? <LoadingIndicator /> :

                    (<ScrollView>
                        {
                            reserves.map((item, index) => (
                                <View key={index}>
                                    <CardBooking onPress={() => handleSelectBooking(item)} reserve={item} />
                                </View>
                            ))
                        }
                    </ScrollView>)

                }


            </ImageBackground>
        </SafeAreaView>
    );
}