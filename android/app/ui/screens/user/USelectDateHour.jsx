import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from 'react-native';
import BackArrow from '../../components/BackArrow';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ButtonPrimary from '../../components/ButtonPrimary';
import axios from 'axios';
import NavigatorConstant from '../../../navigation/NavigatorConstant';

export default function SelectDateHour() {
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedHour, setSelectedHour] = useState('');
    const [room, setRoom] = useState({});
    const [cantEntradas, setCantEntradas] = useState(0);
    const navigation = useNavigation();
    const functions = useSelector(state => state.client.functions);
    const movie = useSelector(state => state.client.movie);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleDatePress = (date) => {
        setSelectedDate(date);
        setSelectedHour('');
    };

    const handleHourPress = async (func) => {
        setSelectedHour(func.hour);

        try {
            const response = await axios.get(`https://backend-adi-uade.onrender.com/rooms/${func.room.id}`);
            setRoom(response.data.data.docs[0]);
        } catch (e) {
            alert(`Error al cargar función`);
        }
    };

    const getHoursForSelectedDate = () => {
        const selectedFunction = functions.find((item) => item.date === selectedDate);
        if (selectedFunction) {
            return [selectedFunction];
        }
        return [];
    };

    const handleIncreaseEntradas = () => {
        setCantEntradas(cantEntradas + 1);
    };

    const handleDecreaseEntradas = () => {
        if (cantEntradas > 0) {
            setCantEntradas(cantEntradas - 1);
        }
    };

    const handleSelectSeats = () => {
        const functionRoom = functions.find(func => func.date == selectedDate && func.hour == selectedHour)

        const functionDetails = {
            ...functionRoom,
            cantEntradas: cantEntradas,
            price: room.price
        }
        navigation.navigate(NavigatorConstant.USER.SELECT_SEATS, { functionDetails })
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
            fontSize: 20,
            marginTop: 34,
            fontWeight: '600',
            textDecorationLine: 'underline'
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
                <Text style={styles.subtitle}>Seleccionar Fecha</Text>
                <ScrollView style={{ flexGrow: 0 }} horizontal>
                    <View style={styles.dateContainer}>
                        {functions.map((item) => (
                            <TouchableOpacity
                                key={item._id}
                                onPress={() => handleDatePress(item.date)}
                            >
                                <Text style={[styles.date, selectedDate === item.date && { fontWeight: 'bold' }]}>
                                    {item.date}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </ScrollView>
                {selectedDate && (
                    <>
                        <Text style={[styles.subtitle, { marginTop: 20 }]}>Seleccionar Hora</Text>
                        <View style={styles.hourContainer}>
                            {getHoursForSelectedDate().map((func) => (
                                <TouchableOpacity
                                    key={func._id}
                                    style={{ marginTop: 10 }}
                                    onPress={() => handleHourPress(func)}
                                >
                                    <Text style={[styles.hour, selectedHour === func.hour && { fontWeight: 'bold' }]}>
                                        {func.hour}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </>
                )}
                {selectedHour && (
                    <>
                        <Text style={[styles.subtitle, { marginTop: 20 }]}>Seleccionar Entradas</Text>
                        <View style={styles.entradasContainer}>
                            <View style={styles.cantidadContainer}>
                                <Text style={styles.hour}>Cantidad: (${room.price}) </Text>
                                <TouchableOpacity style={styles.boton} onPress={handleDecreaseEntradas}>
                                    <Text style={styles.botonText}>-</Text>
                                </TouchableOpacity>
                                <Text style={styles.cantidad}>{cantEntradas}</Text>
                                <TouchableOpacity style={styles.boton} onPress={handleIncreaseEntradas}>
                                    <Text style={styles.botonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </>
                )}
                {
                    cantEntradas > 0 && (
                        <ButtonPrimary onPress={handleSelectSeats} butacas={true} title={'Seleccionar Butacas'} />
                    )
                }
            </ImageBackground>
        </SafeAreaView>
    );
}
