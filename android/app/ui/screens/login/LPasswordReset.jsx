import React, { useState } from 'react';
import { View, Modal, Text, Pressable, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity, TextInput } from 'react-native';
import Popup from '../../components/Popup';
import ButtonPrimary from '../../components/ButtonPrimary';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import loginWS from '../../../networking/api/endpoints/User'
import axios from 'axios';
import { ActivityIndicator } from '@react-native-material/core';

export default function PasswordReset({ navigation }) {

    const [email, setEmail] = React.useState('');
    const [user, setUser] = React.useState({})
    const [isLoading, setIsLoading] = React.useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');
    const [enteredCode, setEnteredCode] = React.useState('');

    const closeModal = () => setModalVisible(false);


    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handleEnteredCode = text => setEnteredCode(text)

    const handleVerification = () => {
        if (verificationCode === enteredCode) {
            closeModal();
            navigation.navigate('NEW_PW',{ user })
        } else {
            ToastAndroid.show('Código incorrecto', ToastAndroid.SHORT);
            closeModal()
        }
    };

    const handlePressConfRecov = async () => {
        setIsLoading(true)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        const obj = {
            email: email
        }

        try {
            const response = await axios.post('https://backend-adi-uade.onrender.com/users/userByMail/', obj, { headers })
            if (response.data.data.docs.length = 1) {
                setUser(response.data.data.docs[0])
                const data = {
                    tipo: 2,
                    email: email,
                    asunto: 'Codigo de recuperación de contraseña'
                }
                console.log(data)
                const res = await axios.post('https://backend-adi-uade.onrender.com/users/sendMail/', data, { headers })
                setVerificationCode(res.data.code)
                setIsLoading(false)
                setModalVisible(true)
            }
        }
        catch (e) {
            console.error(e)
        }
    };




    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        titleContainer: {
            height: 80,
            width: '100%',
            backgroundColor: '#E01D6F',
            justifyContent: 'center',
            alignItems: 'center',
        },
        toggleButton: {
            alignSelf: 'center',
            marginTop: 10,
        },
        toggleButtonText: {
            fontSize: 16,
            color: '#E01D6F',
            textDecorationLine: 'underline',
        }
        ,
        titleContainer: {
            height: 80,
            width: '100%',
            backgroundColor: '#E01D6F',
            justifyContent: 'center',
            alignItems: 'center',
        },
        toggleButton: {
            alignSelf: 'center',
            marginTop: 10,
        },
        toggleButtonText: {
            fontSize: 16,
            color: '#E01D6F',
            textDecorationLine: 'underline',
        },
        footer: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 20,
            textAlign: 'center',
        },
        footerNegrita: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 20,
            fontWeight: 'bold',
        },
        centeredView: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 22,
        },
        modalView: {
            margin: 20,
            backgroundColor: '#41041E',
            borderRadius: 20,
            padding: 10,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,
            marginTop: 250,
        },
        button: {
            borderRadius: 20,
            backgroundColor: '#E01D6F',
            paddingVertical: 10,
            margin: 30,
        },
        buttonOpen: {
            backgroundColor: '#F194FF',
        },
        buttonClose: {
            padding: 80,
            borderRadius: 20,
            backgroundColor: '#E01D6F',
            paddingVertical: 5,
        },
        textStyle: {
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            fontWeight: 600,
            paddingVertical: 5
        },
        modalText: {
            marginTop: 20,
            fontSize: 18,
            color: 'white',
            marginBottom: 15,
            textAlign: 'center',
        },

        input: {
            backgroundColor: 'white',
            borderRadius: 20,
            marginHorizontal: 32,
            paddingHorizontal: 50,
            color: 'black'
        },
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
        },
    });


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <View styles={styles.container}>
                    <Logo />
                    <Input editable={true} onChangeText={handleEmailChange} marginTop={80} placeholder='Ingrese su email' />

                    {modalVisible && (
                        <View style={styles.modalBackground}>
                            <Modal
                                animationType="popup"
                                transparent={true}
                                visible={modalVisible}>
                                <View>
                                    <View style={styles.modalView}>
                                        <Text style={styles.modalText}>Se ha enviado un código de verificación al mail ingresado. Por favor ingréselo</Text>
                                        <TextInput editable={true} style={styles.input} onChangeText={handleEnteredCode} placeholderTextColor={'black'} placeholder='Ingrese el código' textAlign='center' />
                                        <Pressable
                                            onPress={handleVerification}
                                            style={[styles.button, styles.buttonClose]}
                                        >
                                            <Text style={styles.textStyle}>Validar</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </Modal>
                        </View>
                    )}
                    {isLoading ? (
                        <ActivityIndicator
                            style={styles.loading}
                            size="large"
                            color="#FFFFFF"
                        />
                    ) : (
                        null
                    )}

                    <ButtonPrimary onPress={handlePressConfRecov} marginTop={10} title='Enviar correo de recuperación' />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
