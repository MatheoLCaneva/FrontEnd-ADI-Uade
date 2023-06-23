import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Logo from "../components/Logo";
import { useNavigation } from '@react-navigation/native';

export default function MainScreen() {
  const halfScreenWidth = Dimensions.get('window').width / 2;
  const calculatedValue = halfScreenWidth - 341 / 2 + 0.5;

  const navigation = useNavigation()

  const handlePress = () => {
    navigation.push('LOGIN')
  }

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
    },

    footerNegrita: {
      fontFamily: 'Poppins',
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
    },

    button: {
      fontWeight: 700,
      color: 'white',
      textAlign: 'center',
      fontSize: 20
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/gradient.png')}
        style={styles.container}
      >
        <Logo />
        <View style={styles.container}>
          <Text style={styles.text}>Iniciar sesión como cliente</Text>
          <Image style={styles.google} resizeMode='contain' source={require('../../assets/googleimage.png')} />
          <TouchableOpacity style={{ marginTop: 200, flexDirection: 'row', alignSelf: 'center' }} onPress={handlePress}>
            <Text style={styles.footer}>Sos dueño? </Text><Text style={styles.footerNegrita}>Ingresa aquí</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
