import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { TouchableOpacity } from 'react-native';
import Logo from '../../components/Logo';
import { useNavigation } from '@react-navigation/native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useDispatch } from 'react-redux';
import { setUser } from '../../../redux/store';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen() {
  const [userr, setUserr] = useState({});
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1081543611987-042b0pvntvmg0f6u2j39g0okrh5bcuk4.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
    checkUser();
  }, []);

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
      console.log('due____', userInfo);
      setUserr(userInfo);
      dispatch(setUser(userInfo));
      await AsyncStorage.setItem('user', JSON.stringify(userInfo));
      navigation.replace(NavigatorConstant.NAVIGATOR.USERS_TAB_HOME);
    } catch (e) {
      console.log('Message full_____', e);
      console.log('Message____', e.message);
      if (e.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User Cancelled The Login Flow');
      } else if (e.code === statusCodes.IN_PROGRESS) {
        console.log('Signing in');
      } else if (e.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play Services Not Available');
      } else {
        console.log('Some other error happened');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({});
    } catch (e) {
      console.log(e);
    }
  };

  const handlePress = () => {
    navigation.push('LOGIN');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    text: {
      fontFamily: 'Poppins',
      color: 'white',
      fontSize: 20,
      textAlign: 'center',
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
    googleButton: {
      height: 60,
      marginTop: 10,
      alignSelf: 'center',
    },
  });

  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>Iniciar sesión como cliente</Text>
      {!userr.idToken ? (
        <GoogleSigninButton
          style={styles.googleButton}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Light}
          onPress={signIn}
        />
      ) : (
        <TouchableOpacity onPress={signOut}>
          <Text>SignOut</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        style={{ marginTop: 180, flexDirection: 'row', alignSelf: 'center' }}
        onPress={handlePress}>
        <Text style={styles.footer}>Eres dueño? </Text>
        <Text style={styles.footerNegrita}>Ingresa aquí</Text>
      </TouchableOpacity>
    </View>
  );
}
