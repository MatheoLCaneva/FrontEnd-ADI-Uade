import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import ButtonOwnerPrimary from '../components/ButtonOwnerPrimary';
import ButtonOwnerSecundary from '../components/ButtonOwnerSecundary';
import Input from '../components/Input';
import loginWS from '../../networking/api/endpoints/User'
import axios from 'axios';

export default function OwnerAddRoom({navigation}) {

    const handleName= (text) => {
        setName(text);
    };

    const handlePrice = (text) => {
        setPrice(text);
    };

    const handleRows = (text) => {
        setRows(text);
    };

    const handleColumns = (text) => {
        setColumns(text);
    };

    const handleCreateCine = () => {
        navigation.navigate('OWNER_ROOMS')
        // Me tiene que mandar primero al POPUP y después al ownerLogin
    };
    
    const handleCancel = () => {
        navigation.navigate('OWNER_ROOMS')
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
                    <Input onChangeText={handlePrice} marginTop={25} placeholder='Precio' />
                    <Input onChangeText={handleRows} marginTop={25} placeholder='Nro Filas' />
                    <Input onChangeText={handleColumns} marginTop={25} placeholder='Nro Columnas' />
                
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
