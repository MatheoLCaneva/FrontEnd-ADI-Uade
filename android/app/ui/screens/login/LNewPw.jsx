import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import CheckButton from '../../components/CheckButton';
import ButtonPrimary from '../../components/ButtonPrimary';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import loginWS from '../../../networking/api/endpoints/User'
import axios from 'axios';

export default function NewPw({ navigation, route }) {

    const [password, setPassword] = React.useState('');
    const [passwordRepeat, setPasswordRepeat] = React.useState('');
    const user = route.params.user

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handlePasswordRepeatChange = (text) => {
        setPasswordRepeat(text);
    };

    const handleNewPw = async () => {

        if (password === passwordRepeat) {
            const headers = {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }

            const updatedUser = {
                ...user,
                password: password
            }

            try {
                const response = await axios.put(`https://backend-adi-uade.onrender.com/users/`, updatedUser, { headers })
                if (response.data.status === 200) {
                    ToastAndroid.show('Contraseña actualizada', ToastAndroid.LONG);
                    navigation.navigate('LOGIN')
                }
            } catch (e) {
                ToastAndroid.show('Se produjo un error al cambiar su contraseña, reintente dentro de unos minutos.', ToastAndroid.LONG);

            }
        }
        else {
            // Las contraseñas no coinciden, puedes mostrar un mensaje de error o realizar otra acción
            ToastAndroid.show('Las contraseñas no coinciden', ToastAndroid.SHORT);
        }


        // ToastAndroid.show(data.data, ToastAndroid.SHORT);
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
        recuerdame: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 15,
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
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <View styles={styles.container}>
                    <Logo />
                    <Input onChangeText={handlePasswordChange} marginTop={10} placeholder='Ingrese su nueva contraseña' secure={true} />
                    <Input onChangeText={handlePasswordRepeatChange} marginTop={27} placeholder='Repita su nueva contraseña' secure={true} />
                    <ButtonPrimary onPress={handleNewPw} title='Actualizar contraseña' />

                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
