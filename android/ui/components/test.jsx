import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, Dimensions } from 'react-native';

export default function LoginScreen() {
  const halfScreenWidth = Dimensions.get('window').width / 2;
  const calculatedValue = halfScreenWidth - 341 / 2 + 0.5;

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
    title: {
      fontFamily: 'Poppins',
      fontWeight: '600',
      fontSize: 28,
      color: '#FFFFFF',
    },
    text: {
      fontFamily: 'Poppins',
      color: 'white',
      fontSize: 20,
      marginLeft: 26
    },
    image: {
      position: 'relative',
      width: 341,
      height: 160,
      left: calculatedValue,
      marginBottom: 45
    },
    google: {
      width: '80%',
      position: 'relative',
      left: 26,
    },

    footer: {
      fontFamily: 'Poppins',
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
      marginTop: 100
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../app/assets/gradient.png')}
        style={styles.container}
      >
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Bienvenido</Text>
          </View>
          <Image style={styles.image} source={require('../../app/assets/logo.png')} />
          <Text style={styles.text}>Iniciar sesión como cliente</Text>
          <Image style={styles.google} resizeMode='contain' source={require('../../app/assets/googleimage.png')} />
          <Text style={styles.footer}>Sos dueño? <Text style={{fontWeight: 700}}>Ingresa aqui</Text> </Text>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
