import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import BackArrow from '../../components/BackArrow';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import ButtonPrimary from '../../components/ButtonPrimary';
import axios from 'axios';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import { setFunctionToReserve } from '../../../redux/store';

export default function SelectSeats({ route }) {

    const functionDetails = route.params.functionDetails;
    const movie = useSelector(state => state.client.movie);
    const maxSeats = functionDetails.cantEntradas
    const [selectedSeats, setSelectedSeats] = useState([])
    const dispatch = useDispatch()

    const navigation = useNavigation();
    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleSeatPress = (seat) => {
        if (selectedSeats.includes(seat)) {
            setSelectedSeats(prevSeats => prevSeats.filter(selectedSeat => selectedSeat !== seat));
        } else if (selectedSeats.length === maxSeats) {
            setSelectedSeats(prevSeats => {
                const newSeats = [...prevSeats];
                newSeats.shift();
                return [...newSeats, seat];
            });
        } else {
            setSelectedSeats(prevSeats => [...prevSeats, seat]);
        }
    };

    const handleViewReserve = () => {
        const { seats, ...rest } = functionDetails;
        const reserve = {
            ...rest,
            selectedSeats: selectedSeats
        };

        dispatch(setFunctionToReserve(reserve))
        navigation.navigate(NavigatorConstant.USER.VIEW_RESERVE)


    }

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
        dateHour: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 20,
            marginTop: 20,
        },
        line: {
            height: 4,
            backgroundColor: 'white',
            borderRadius: 20,
            marginHorizontal: 30,
            marginTop: 10,
            marginBottom: 40
        },
        rowContainer: {
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 10,
            marginHorizontal: 40
        },
        seat: {
            width: 20,
            height: 20,
            borderRadius: 10,
            backgroundColor: 'white',
            marginRight: 10,
            justifyContent: 'center',
            alignItems: 'center',
        },
        seatText: {
            color: 'black',
            fontSize: 12,
        },
    });

    // Agrupar los asientos por filas
    const groupedSeats = functionDetails.seats.reduce((acc, seat) => {
        const row = seat.row;
        if (!acc[row]) {
            acc[row] = [];
        }
        acc[row].push(seat);
        return acc;
    }, {});

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <BackArrow onPress={handleGoBack} />
                <Text style={styles.title}>{movie.title.toUpperCase()}</Text>
                <View style={styles.dateHour}>
                    <Text style={styles.subtitle}>Fecha: {functionDetails.date}</Text>
                    <Text style={styles.subtitle}>Hora: {functionDetails.hour}</Text>
                </View>
                <Text style={[styles.subtitle, { textAlign: 'center', marginTop: 20 }]}>Pantalla</Text>
                <View style={styles.line} />
                <ScrollView style={{ flexGrow: 0 }}>
                    {Object.keys(groupedSeats).map(row => (
                        <View key={row} style={styles.rowContainer}>
                            {groupedSeats[row].map((seat, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => handleSeatPress(seat)}
                                    disabled={seat.isUsed} // Deshabilitar si seat.isUsed es true
                                    style={[
                                        styles.seat,
                                        {
                                            backgroundColor: selectedSeats.includes(seat)
                                                ? 'green'
                                                : seat.isUsed
                                                    ? 'blue'
                                                    : 'white',
                                        },
                                    ]}
                                ></TouchableOpacity>
                            ))}
                        </View>
                    ))}
                </ScrollView>

                {
                    selectedSeats.length == maxSeats && (
                        <ButtonPrimary onPress={handleViewReserve} selecAsientos={true} title={'Reservar'} />
                    )
                }
            </ImageBackground>
        </SafeAreaView>
    );
}
