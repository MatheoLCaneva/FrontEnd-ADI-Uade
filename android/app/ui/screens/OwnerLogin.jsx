import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';
import LoginButton from '../components/LoginButton';
import Logo from '../components/Logo';
import Input from '../components/Input';

export default function OwnerLogin() {

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
        }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/gradient.png')}
                style={styles.container}
            >
            <View styles={styles.container}>
                <Logo />
                <Input placeholder='Ingrese su email'/>
                <LoginButton title='Ingresar' />
            </View>
            
            </ImageBackground>
        </SafeAreaView>
    );
}
