import React, { useEffect, useState } from 'react';
import { View, Modal, Text, Pressable, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity, TextInput } from 'react-native';
import DualButtonFooter from '../../components/DualButtonFooter';
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { useSelector, useDispatch } from 'react-redux';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { setScreen } from '../../../redux/store';
import { updateFields } from './redux/actions';

export default function UserProfile() {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();

    const [GivenName, setGivenName] = useState('');
    const [FamilyName, setFamilyName] = useState('');
    const handleGivenNameChange = (text) => setGivenName(text);
    const handleFamilyNameChange = (text) => setFamilyName(text);

    useEffect(() => {        
        console.log("🚀 ~ file: UProfile.jsx:12 ~ UserProfile ~ user:", user)
    }, []);

    // const handleEditCinema = async () => {
    //     setIsLoading(true)
    //     const updatedCinema = {
    //         ...cinema,
    //         name: name !== '' ? name : cinema.name || '',
    //         address: {
    //             ...cinema.address,
    //             name: address !== '' ? address : cinema.address.name || '',
    //             city: city !== '' ? city : cinema.address.city || '',
    //             district: district !== '' ? district : cinema.address.district || '',
    //             country: country !== '' ? country : cinema.address.country || '',
    //         },
    //     };

    //     const headers = {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //     };


    //     try {
    //         const response = await axios.put(`https://backend-adi-uade.onrender.com/cinemas/`, updatedCinema, { headers });
    //         if (response.data.status === 200) {
    //             ToastAndroid.show("Cine modificado con éxito.", ToastAndroid.SHORT)
                
    //             setIsLoading(false);
    //             navigation.dispatch(
    //                 CommonActions.reset({
    //                     index: 0,
    //                     routes: [{ name: 'OWNER_HOME', params: { transition: 'slide_from_left' }, }],
    //                 })
    //             );
    //         }

    //     } catch (e) {
    //         console.log(e)
    //     }


    // };

    // const completeBackAction = () => {
    //     dispatch(setScreen(NavigatorConstant.USER.USER_HOME));
    //     navigation.goBack();
    // };
    const signOut = async () => {
        try {
          await GoogleSignin.revokeAccess()
          await GoogleSignin.signOut()
          setUser({})
        } catch (e) {
          console.log(e)
        }
      }
    
    
    console.log(user.user)
    const styles = StyleSheet.create({
        input: {
            backgroundColor: 'white',
            borderRadius: 20,
            marginHorizontal: 32,
            paddingHorizontal: 50,
            marginTop: 28,
        },
        modalBackground: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
        },
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image
                source={{uri: user.user.photo}}
                style={{
                    width: 150,
                    height: 150,
                    borderRadius: 150,
                    borderWidth: 2,
                    margin: 50,
                    alignSelf: 'center',
                    borderColor: '#dbdbdb',
                }}
            />

            {/* <TextInput style={styles.input} placeholder={user.user.givenName} textAlign='center'  value={user.user.givenName} onChangeText={(value) => user.handleFieldChange(user.user.givenName, value)}/> */}
            
            {/* <TextInput style={styles.input} placeholder={user.user.givenName} textAlign='center' onChangeText={handleGivenNameChange}/> */}
            <TextInput style={styles.input} placeholder={user.user.givenName} textAlign='center' onChangeText={handleGivenNameChange}/>
            <TextInput style={styles.input} placeholder={user.user.familyName} textAlign='center' onChangeText={handleFamilyNameChange}/>
            <TextInput style={styles.input} placeholder={user.user.email} textAlign='center' />
            {/* <DualButtonFooter primaryTitle='Confirmar' onPressPrimary={this.handleFormSubmit} secondaryTitle='Cerrar Sesion' onPressSecondary={completeBackAction} /> */}
            {!user.rol && <DualButtonFooter primaryTitle='Confirmar' onPressPrimary={this.handleFormSubmit} secondaryTitle='Cerrar Sesion' onPressSecondary={signOut}  />}
        </SafeAreaView>
    );
}
