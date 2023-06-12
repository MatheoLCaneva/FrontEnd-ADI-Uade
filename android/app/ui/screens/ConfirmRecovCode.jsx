import React, {useState} from 'react';
import { View, Modal, Text, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import Popup from '../components/Popup';
import Logo from '../components/Logo';
import Input from '../components/Input';
import loginWS from '../../networking/api/endpoints/User'
import axios from 'axios';
import LoginButton from '../components/LoginButton';

export default function PasswordReset() {

    const [email, setEmail] = React.useState('');
    // const [password, setPassword] = React.useState('');
    // const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState({})

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    // const handlePasswordChange = (text) => {
    //     setPassword(text);
    // };

    // const handleTogglePasswordVisibility = () => {
    //     setShowPassword(!showPassword);
    // };

    const handleLogin = () => {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        const data = {
            code: 'codigo123',
        }

        axios.post('https://backend-adi-uade.onrender.com/users/login', data, { headers })
            .then(
                response => console.log(response.data)
            )
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
    });

    
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/gradient.png')}
                style={styles.container}
            >
                <View styles={styles.container}>
                    <Logo />
                    <Input onChangeText={handleEmailChange} marginTop={10} placeholder='Ingrese su cpodigo de recuperación' />
                    {/* <Input onChangeText={handlePasswordChange} marginTop={27} placeholder='Ingrese su contraseña' secure={!showPassword} />
                    <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.toggleButton}>
                        <Text style={styles.toggleButtonText}>
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </Text>
                    </TouchableOpacity> */}
                    <LoginButton onPress={handleLogin} title='Continuar' />
                    <Popup/> 

                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
