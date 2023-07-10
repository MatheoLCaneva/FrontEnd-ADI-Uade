/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, ToastAndroid, TouchableOpacity, ActivityIndicator, Keyboard } from 'react-native';
import CheckButton from '../../components/CheckButton';
import ButtonPrimary from '../../components/ButtonPrimary';
import Logo from '../../components/Logo';
import Input from '../../components/Input';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/store';
import { CommonActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NavigatorConstant from '../../../navigation/NavigatorConstant';

export default function OwnerLogin({ props, route, navigation }) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [isLoading, setLoading] = React.useState(false)

    const dispatch = useDispatch()

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handlePressRecoveryPass = () => {
        navigation.navigate('PASSWORD_RECOVERY')
    };

    const handlePressRegister = () => {
        navigation.push("REGISTER")
    };

    const handleLogin = async () => {
        Keyboard.dismiss()
        setLoading(true)
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        const data = {
            email: email,
            password: password,
            rol: 'Owner',
        }

        try {
            const response = await axios.post('https://backend-adi-uade.onrender.com/users/login', data, { headers });
            console.log(response.data)
            if (response.data.status == 201) {
                setLoading(false);
                const user = response.data.loginUser.user;
                console.log("🚀 ~ file: LOwnerLogin.jsx:60 ~ handleLogin ~ user:", user)
                dispatch(setUser(user));
                AsyncStorage.setItem('Owner', JSON.stringify(user))
                navigation.replace(NavigatorConstant.OWNER.OWNER_HOME);
            }
        } catch (err) {
            if (err.response.status === 400) {
                console.log("🚀 ~ file: LOwnerLogin.jsx:62 ~ handleLogin ~ err:", err)
                ToastAndroid.show("Error de usuario y/o contraseña", ToastAndroid.LONG);
                setLoading(false);
            }

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
        <View styles={styles.container}>
            <Logo />
            <Input onChangeText={handleEmailChange} marginTop={10} placeholder='Ingrese su email' />
            <Input onChangeText={handlePasswordChange} marginTop={27} placeholder='Ingrese su contraseña' secure={!showPassword} />
            <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.toggleButton}>
                <Text style={styles.toggleButtonText}>
                    {showPassword ? 'Ocultar' : 'Mostrar'}
                </Text>
            </TouchableOpacity>

            {/* <CheckButton style={{ marginTop: 30, flexDirection: 'row', alignSelf: 'center' }} /> */}

            <View style={styles.buttonContainer}>
                <ButtonPrimary onPress={handleLogin} title='Ingresar' disabled={isLoading} />
                {isLoading ? (
                    <ActivityIndicator style={styles.loadingIndicator} size="small" color="#ffffff" />
                ) : (
                    null
                )
                }
            </View>

            <TouchableOpacity style={{ marginTop: 40 }} onPress={handlePressRecoveryPass}>
                <Text style={styles.footer}>Olvidé mi contraseña</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ marginTop: 30, flexDirection: 'row', alignSelf: 'center' }} onPress={handlePressRegister}>
                <Text style={styles.footer}>No estas registrado?</Text><Text style={styles.footerNegrita}> Registrate</Text>
            </TouchableOpacity>

        </View>
    );
}
