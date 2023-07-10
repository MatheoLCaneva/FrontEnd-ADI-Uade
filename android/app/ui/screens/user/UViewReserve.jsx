import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import BackArrow from '../../components/BackArrow';
import { useNavigation } from '@react-navigation/native';
import ButtonPrimary from '../../components/ButtonPrimary';
import axios from 'axios';
import { setFunctionReserved } from '../../../redux/store';
import NavigatorConstant from '../../../navigation/NavigatorConstant';

export default function ViewReserve() {
    const reserve = useSelector(state => state.client.functionToReserve);
    const user = useSelector(state => state.user)
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const handleGoBack = () => {
        navigation.goBack();
    };
    const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // Array de letras correspondientes a cada número de fila

    const handleConfirmReserve = async () => {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const obj = {
            user: {
                email: user.email,
                name: user.name
            },
            cinema: reserve.cinema,
            room: reserve.room,
            movie: {
                title: reserve.movie.title,
                id: reserve.movie._id
            },
            date: reserve.date,
            hour: reserve.hour,
            seats: reserve.selectedSeats,
            totalPrice: reserve.price * reserve.cantEntradas,
            qrCode: 'none',
            functionId: reserve._id
        }
        console.log(obj)
        try {
            const response = await axios.post('https://backend-adi-uade.onrender.com/reservations/', obj, { headers })
            if (response.data.status == 201) {
                dispatch(setFunctionReserved(response.data.created))
                navigation.push(NavigatorConstant.USER.RESERVE_DONE)
            }
        } catch (e) {
            alert('Error al reservar')
        }
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
        sutitle: {
            fontSize: 22,
            marginHorizontal: 15,
            marginTop: 20,
            color: 'white',
            fontWeight: '600',
            textDecorationLine: 'underline'
        },
        text: {
            color: 'white',
            fontSize: 18,
            marginTop: 27,
            fontWeight: '600',
            marginHorizontal: 25
        },
        dateHour: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5
        },
        seats: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            flexGrow: 0.80
        },
        price: {
            marginBottom: 40
        }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <BackArrow onPress={handleGoBack} />
                <Text style={styles.title}> Confirmación de reserva</Text>
                <Text style={styles.text}> Funcion: {reserve.movie.title}</Text>
                <View style={styles.dateHour}>
                    <Text style={styles.text}>Fecha: {reserve.date}</Text>
                    <Text style={styles.text}>Hora: {reserve.hour}</Text>
                </View>
                <Text style={styles.sutitle}>Lugar de Reserva</Text>
                <Text style={styles.text}>Cine: {reserve.cinema.name}</Text>
                <Text style={styles.text}>Sala: {reserve.room.name}</Text>
                <Text style={styles.sutitle}>Sus Butacas</Text>
                <View style={styles.seats}>
                    {reserve.selectedSeats.map((item, index) => {
                        const rowLetter = rowLetters[item.row - 1];
                        return (
                            <Text style={styles.text} key={index}>
                                Asiento: {rowLetter}{item.column}
                            </Text>
                        );
                    })}
                </View>
                <Text style={[styles.sutitle, styles.price]}>Total: ${reserve.price * reserve.cantEntradas}</Text>
                <ButtonPrimary onPress={handleConfirmReserve} confirmarReserva={true} title={'Confirmar'} />
            </ImageBackground>
        </SafeAreaView>
    );
}
