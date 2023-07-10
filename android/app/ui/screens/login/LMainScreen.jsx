import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, Image, Dimensions, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Logo from "../../components/Logo";
import { useNavigation } from '@react-navigation/native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/store';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function MainScreen() {
  const [userr, setUserr] = useState({})
  const navigation = useNavigation()
  const dispatch = useDispatch()

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1081543611987-042b0pvntvmg0f6u2j39g0okrh5bcuk4.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
    checkOwner()
    checkUser()
  }, [])

  const checkOwner = async () => {
    const user = await AsyncStorage.getItem('Owner');
    if (user) {
      const parsedUser = JSON.parse(user);
      dispatch(setUser(parsedUser));
      navigation.replace(NavigatorConstant.OWNER.OWNER_HOME);
    }
  };

  const checkUser = async () => {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserr(parsedUser);
      dispatch(setUser(parsedUser));
      navigation.replace(NavigatorConstant.NAVIGATOR.USERS_TAB_HOME);
    }
  };
  const signIn = async () => {

    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
      const data = {
        email: userInfo.user.email,
        rol: 'User',
      }

      try {
        const response = await axios.post('https://backend-adi-uade.onrender.com/users/login', data, { headers });
        if (response.data.status === 201) {
          dispatch(setUser(response.data.loginUser))
          await AsyncStorage.setItem('user', JSON.stringify(response.data.loginUser))
          navigation.replace(NavigatorConstant.NAVIGATOR.USERS_TAB_HOME)
        }
      }
      catch (e) {
        const obj = {
          email: userInfo.user.email,
          name: userInfo.user.givenName,
          lastName: userInfo.user.familyName,
          rol: 'User',
          imgUser: userInfo.user.photo
        }
        const response = await axios.post('https://backend-adi-uade.onrender.com/users/', obj, { headers })
        if (response.data.status === 201) {
          setUserr(userInfo)
          dispatch(setUser(response.data.createdUser))
          await AsyncStorage.setItem('user', JSON.stringify(response.data.createdUser))
          navigation.replace(NavigatorConstant.NAVIGATOR.USERS_TAB_HOME)

        }
      }

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
            !userr.idToken ?
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
