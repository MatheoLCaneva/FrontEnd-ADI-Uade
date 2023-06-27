import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Logo from "../../components/Logo";
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

export default function MainScreen() {
  const [user, setUser] = useState({})
  const navigation = useNavigation()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1081543611987-042b0pvntvmg0f6u2j39g0okrh5bcuk4.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
    isSignedIn()
  }, [])

  const signIn = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('due____', userInfo);
      setUser(userInfo)
    } catch (e) {
      console.log('Message full_____', e)
      console.log('Message____', e.message);
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled The Login Flow')
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in')
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available')
      } else {
        console.log('Some other error happened')
      }

    }
  }

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn()
    if (!!isSignedIn) {
      getCurrentUserInfo()
    } else {
      console.log('Please Login')
    }
  }

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('edit____', user)
      setUser(userInfo)
    } catch (e) {
      if (e.code === statusCodes.SIGN_IN_REQUIRED) {
        Alert.alert('user has not signed in')
      }
    }
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess()
      await GoogleSignin.signOut()
      setUser({})
    } catch (e) {
      console.log(e)
    }
  }

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
    }, googleButton: {
      width: 250,
      height: 50,
      marginLeft: 22
    }
  });

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../../assets/gradient.png')}
        style={styles.container}
      >

        <Logo />
        <View style={styles.container}>
          <Text style={styles.text}>Iniciar sesión como cliente</Text>
          {
            !user.idToken ?
              <GoogleSigninButton
                style={styles.googleButton}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Light}
                onPress={signIn}
              /> :
              <TouchableOpacity onPress={signOut}>
                <Text>SignOut</Text>
              </TouchableOpacity>
          }
          <TouchableOpacity style={{ marginTop: 200, flexDirection: 'row', alignSelf: 'center' }} onPress={handlePress}>
            <Text style={styles.footer}>Eres dueño? </Text><Text style={styles.footerNegrita}>Ingresa aquí</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
