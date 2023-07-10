import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, ToastAndroid } from 'react-native';
import { useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import InputComment from '../../components/InputComment';
import ButtonSend from '../../components/ButtonSend';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import LoadingIndicator from '../../components/LoadingIndicator';

export default function BookingDetail() {
    const [isLoading, setIsLoading] = useState(true);
    const reserve = useSelector(state => state.client.reserve)
    const [text, setText] = useState('')
    const [isComment, setIsComment] = useState(false)
    const rowLetters = ['A', 'B', 'C', 'D', 'E', 'F', 'G']; // Array de letras correspondientes a cada número de fila
    const logo = require('../../../assets/logo.png')
    const navigation = useNavigation()


    const fetchComment = async () => {
        try {
            const response = await axios.get(`https://backend-adi-uade.onrender.com/comments/user/${reserve.user.email}/${reserve.movie.id}`)
            if (response.data.data.docs.length !== 0) {
                setIsComment(true)
            }
        } catch (e) {
            ToastAndroid.show('Error al cargar comentarios', ToastAndroid.SHORT)
            console.error(e)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchComment()
    }, [])

    const handleChangeText = (text) => {
        setText(text)
    }

    const handleSendComment = async () => {
        setIsLoading(true)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };


        const obj = {
            user: reserve.user,
            movie: reserve.movie,
            comment: text
        }

        try {
            const response = await axios.post('https://backend-adi-uade.onrender.com/comments/', obj, { headers })
            if (response.data.status === 201) {
                ToastAndroid.show('Comentario creado con éxito', ToastAndroid.SHORT)
                navigation.goBack()
            }
        } catch (e) {
            ToastAndroid.show('Error al enviar su comentario', ToastAndroid.SHORT)
        }
        setIsLoading(false)
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
            flexGrow: reserve.seats.length > 2 ? 0.9 : 0.6
        },
        price: {
            marginBottom: reserve.seats.length > 2 ? 20 : 30
        },
        qr: {
            // marginTop: 200
            alignSelf: 'center',
            marginTop: reserve.seats.length > 2 ? 0 : 10,
        }
    });

    if (!reserve.status) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../assets/gradient.png')}
                    style={styles.container}
                >
                    <Text style={styles.title}> {reserve.movie.title}</Text>
                    <View style={styles.dateHour}>
                        <Text style={styles.text}>Fecha: {reserve.date}</Text>
                        <Text style={styles.text}>Hora: {reserve.hour}</Text>
                    </View>
                    <Text style={styles.sutitle}>Lugar de Reserva</Text>
                    <Text style={styles.text}>Cine: {reserve.cinema.name}</Text>
                    <Text style={styles.text}>Sala: {reserve.room.name}</Text>
                    <Text style={styles.sutitle}>Sus Butacas</Text>
                    <View style={styles.seats}>
                        {reserve.seats.map((item, index) => {
                            const rowLetter = rowLetters[item.row - 1];
                            return (
                                <Text style={styles.text} key={index}>
                                    Asiento: {rowLetter}{item.column}
                                </Text>
                            );
                        })}
                    </View>
                    <Text style={[styles.sutitle, styles.price]}>Total: ${reserve.totalPrice} </Text>
                    <View style={styles.qr}>
                        <QRCode size={reserve.seats.length > 2 ? 180: 200} logo={logo} logoSize={20} value="codigo" />
                    </View>
                </ImageBackground>
            </SafeAreaView>
        );
    }
    else {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../assets/gradient.png')}
                    style={styles.container}
                >
                    {isLoading ? <LoadingIndicator /> :
                        <>
                            <Text style={styles.title}> {reserve.movie.title}</Text>
                            <View style={styles.dateHour}>
                                <Text style={styles.text}>Fecha: {reserve.date}</Text>
                                <Text style={styles.text}>Hora: {reserve.hour}</Text>
                            </View>
                            <Text style={styles.sutitle}>Lugar de Reserva</Text>
                            <Text style={styles.text}>Cine: {reserve.cinema.name}</Text>
                            <Text style={styles.text}>Sala: {reserve.room.name}</Text>
                            <Text style={styles.sutitle}>Su comentario</Text>
                            <InputComment disabled={isComment} onChangeText={handleChangeText} />
                            <View style={{ alignContent: 'flex-start' }}>
                                <ButtonSend disabled={isComment} onPress={handleSendComment} />
                            </View>
                        </>
                    }

                </ImageBackground>
            </SafeAreaView>
        )
    }


}