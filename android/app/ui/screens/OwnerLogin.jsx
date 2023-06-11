import React, {useState} from 'react';
import { CheckBox, View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import LoginButton from '../components/LoginButton';
import Logo from '../components/Logo';
import Input from '../components/Input';
import loginWS from '../../networking/api/endpoints/User'
import axios from 'axios';

export default function OwnerLogin({navigation}) {

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [data, setData] = React.useState({});
    
    // const [isSelected, setSelection] = useState(false); NOFUNCIONA

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
        navigation.navigate('REGISTER')
    };

    const handleLogin = () => {

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        }

        const data = {
            email: 'test@gmail.com',
            password: 'Test1234'
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
                source={require('../../assets/gradient.png')}
                style={styles.container}
            >
                <View styles={styles.container}>
                    <Logo />
                    <Input onChangeText={handleEmailChange} marginTop={10} placeholder='Ingrese su email' />
                    <Input onChangeText={handlePasswordChange} marginTop={27} placeholder='Ingrese su contraseña' secure={!showPassword} />
                    <TouchableOpacity onPress={handleTogglePasswordVisibility} style={styles.toggleButton}>
                        <Text style={styles.toggleButtonText}>
                            {showPassword ? 'Ocultar' : 'Mostrar'}
                        </Text>
                    </TouchableOpacity>
                    
                    <Text style={styles.recuerdame}>Recuérdame FALTA CHECKBOX</Text>
                    
                    <LoginButton onPress={handleLogin} title='Ingresar' />
                    <TouchableOpacity style={{marginTop: 40}} onPress={handlePressRecoveryPass}>
                        <Text style={styles.footer}>Olvidé mi contraseña</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginTop: 30, flexDirection: 'row', alignSelf:'center'}} onPress={handlePressRegister}>
                        <Text style={styles.footer}>No estas registrado?</Text><Text style={styles.footerNegrita}> Registrate</Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
