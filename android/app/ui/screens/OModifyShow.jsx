import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import ButtonOwnerPrimary from '../components/ButtonOwnerPrimary';
import ButtonOwnerSecundary from '../components/ButtonOwnerSecundary';
import Input from '../components/Input';
import loginWS from '../../networking/api/endpoints/User'
import axios from 'axios';

export default function OwnerModifyShow({navigation}) {

    const handleName= (text) => {
        setName(text);
    };

    const handleDirection = (text) => {
        setDirection(text);
    };

    const handleCity = (text) => {
        setCity(text);
    };

    const handleDepartment = (text) => {
        setDepartment(text);
    };

    const handleCountry = (text) => {
        setContry(text);
    };


    const handleCreateCine = () => {
        navigation.navigate('OWNER_SHOW')
        // Me tiene que mandar primero al POPUP y después al ownerLogin
    };
    
    const handleCancel = () => {
        navigation.navigate('OWNER_SHOW')
        // Me tiene que mandar primero al POPUP y después al ownerLogin
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
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/gradient.png')}
                style={styles.container}
            >
                <View styles={styles.container}>
                
                    <Input onChangeText={handleName} marginTop={80} placeholder='Nombre' />
                    <Input onChangeText={handleDirection} marginTop={25} placeholder='Dirección' />
                    <Input onChangeText={handleCity} marginTop={25} placeholder='Ciudad' />
                    <Input onChangeText={handleDepartment} marginTop={25} placeholder='Barrio' />
                    <Input onChangeText={handleCountry} marginTop={25} placeholder='Pais' />
                
                    <View style={{  flexDirection: "row" , justifyContent: 'space-between' }}>
                    <View >
                        <ButtonOwnerSecundary onPress={handleCancel} title='Cancelar' />
                    </View>
                    <View >
                        <ButtonOwnerPrimary onPress={handleCreateCine} title='Crear' /> 
                    </View>
                </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
