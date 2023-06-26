import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity, Modal, TextInput, Button, Pressable } from 'react-native';
import ButtonPrimary from '../../components/ButtonPrimary';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import loginWS from '../../../networking/api/endpoints/User'
import axios from 'axios';
import Popup from '../../components/Popup';

export default function Register({ navigation }) {

    const [name, setName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordRepeat, setPasswordRepeat] = React.useState('');
    const [passwordMismatch, setPasswordMismatch] = React.useState(false);
    const [verificationCode, setVerificationCode] = React.useState('');
    const [enteredCode, setEnteredCode] = React.useState('');
    const [modalVisible, setModalVisible] = React.useState(false);

    // const [showPassword, setShowPassword] = React.useState(false);

    const handleNameChange = text => setName(text)

    const handleLastNameChange = text => setLastName(text)

    const handleEmailChange = text => setEmail(text);

    const handlePasswordChange = text => {
        setPassword(text);
        setPasswordMismatch(text != passwordRepeat)
    }

    const handleRepeatPasswordChange = text => {
        setPasswordRepeat(text);
        setPasswordMismatch(password !== text);
    };

    const showModal = () => setModalVisible(true);

    const closeModal = () => setModalVisible(false);

    const handleEnteredCode = text => setEnteredCode(text)

    const handleVerification = () => {
        if (verificationCode === enteredCode) {
            closeModal();
            handleRegister()
        } else {
            ToastAndroid.show('Código incorrecto', ToastAndroid.SHORT);
            closeModal()
        }
    };

    const validatePassword = (password) => {
        // Expresiones regulares para validar la contraseña
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /\d/;

        if (
            password.length < 6 ||
            !uppercaseRegex.test(password) ||
            !lowercaseRegex.test(password) ||
            !digitRegex.test(password)
        ) {
            return false; // La contraseña no cumple con los requisitos
        }

        return true; // La contraseña es válida
    };

    const handleModal = () => {
        if (password !== passwordRepeat) {
            ToastAndroid.show('Las contraseñas no coinciden', ToastAndroid.SHORT);
        }
        else if (!validatePassword(password)) {
            ToastAndroid.show(
                'La contraseña debe tener al menos una mayúscula, una minúscula, un número y más de 6 caracteres',
                ToastAndroid.LONG
            );
        }

        else {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }

            const obj = {
                tipo: 1,
                email: email,
                asunto: 'Código de registro'
            }

            axios.post('https://backend-adi-uade.onrender.com/users/sendMail', obj, { headers })
                .then(
                    response => {
                        setVerificationCode(response.data.code)
                        setModalVisible(true)
                    }
                )
                .catch(
                    err => console.log(err)
                )
        }

    }
    const handleRegister = () => {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        const data = {
            email: email,
            password: password,
            name: name,
            lastName: lastName,
            rol: 'Owner',
            imgUser: 'Foto'
        }
        axios.post('https://backend-adi-uade.onrender.com/users/', data, {headers})
        .then(
            response => {
                if (response.data.status == 201) {
                    ToastAndroid.show('Registro exitoso', ToastAndroid.SHORT);
                    navigation.navigate('LOGIN')
                }
                else if (response.data.status == 409){
                    ToastAndroid.show('Email existente', ToastAndroid.SHORT);
                }
             }
        )
        .catch(
            err => ToastAndroid.show('Ocurrio un error, verifique los datos ingresados', ToastAndroid.SHORT)
        )

    };

    const handleOwnerLogin = () => {
        navigation.navigate('LOGIN')
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

                <KeyboardAwareScrollView>
                    <View styles={styles.container}>
                        <Logo />
                        <Input onChangeText={handleNameChange} marginTop={18} placeholder='Ingrese su nombre' />
                        <Input onChangeText={handleLastNameChange} marginTop={11} placeholder='Ingrese una apellido' />
                        <Input onChangeText={handleEmailChange} marginTop={11} placeholder='Repita su email' />
                        <Input onChangeText={handlePasswordChange} marginTop={11} placeholder='Ingrese una contraseña' secure={true} />
                        <Input onChangeText={handleRepeatPasswordChange} marginTop={11} placeholder='Repita su contraseña' secure={true} />
                        {/* <Input onChangeText={handlePasswordChange} marginTop={27} placeholder='Ingrese su contraseña' secure={!showPassword} />
                    <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.toggleButton}>
                        <Text style={styles.toggleButtonText}>
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </Text>
                    </TouchableOpacity> */}
                        <ButtonPrimary onPress={handleModal} title='Registrarse' />

                        {modalVisible && (
                            <View style={styles.modalBackground}>
                                <Modal
                                    animationType="popup"
                                    transparent={true}
                                    visible={modalVisible}>
                                    <View>
                                        <View style={styles.modalView}>
                                            <Text style={styles.modalText}>Se ha enviado un código de verificación al mail ingresado. Por favor ingréselo</Text>
                                            <TextInput style={styles.input} onChangeText={handleEnteredCode} placeholder='Ingrese el código' textAlign='center' />
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

                        <TouchableOpacity style={{ marginTop: 11, flexDirection: 'row', alignSelf: 'center' }} onPress={handleOwnerLogin}>
                            <Text style={styles.footer}>Ya estas registrado?</Text><Text style={styles.footerNegrita}> Inicia sesión</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAwareScrollView>
            </ImageBackground>

        </SafeAreaView>
    );
}
