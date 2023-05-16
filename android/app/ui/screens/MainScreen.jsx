import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, Dimensions} from 'react-native';
import { TouchableOpacity } from 'react-native';
import Logo from "../components/Logo";

export default function MainScreen({ navigation }) {
  const halfScreenWidth = Dimensions.get('window').width / 2;
  const calculatedValue = halfScreenWidth - 341 / 2 + 0.5;

  const handlePress = () => {
    navigation.navigate('LOGIN')
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
          {/* <View style={styles.titleContainer}>
            <Text style={styles.title}>Bienvenido</Text>
          </View> */}
          <Text style={styles.text}>Iniciar sesión como cliente</Text>
          <Image style={styles.google} resizeMode='contain' source={require('../../assets/googleimage.png')} />
          <TouchableOpacity style={{marginTop: 100}} onPress={handlePress}>
            <Text style={styles.footer}>Sos dueño? Ingresa aquí</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
