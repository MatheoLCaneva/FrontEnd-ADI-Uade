import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, Image, TextInput } from 'react-native';
import DualButtonFooter from '../../components/DualButtonFooter';
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfile() {
    const user = useSelector(state => state.user);

    const [GivenName, setGivenName] = useState('');
    const [FamilyName, setFamilyName] = useState('');
    const handleGivenNameChange = (text) => setGivenName(text);
    const handleFamilyNameChange = (text) => setFamilyName(text);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const logout = () => {
        AsyncStorage.removeItem('user')
        navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN);
        dispatch(setUser({}));
    };

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
                source={{ uri: user.imgUser }}
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

            <TextInput placeholderTextColor={'black'} style={styles.input} placeholder={user.name} textAlign='left' onChangeText={handleGivenNameChange} />
            <TextInput placeholderTextColor={'black'} style={styles.input} placeholder={user.lastName} textAlign='left' onChangeText={handleFamilyNameChange} />
            <TextInput placeholderTextColor={'black'} style={styles.input} placeholder={user.email} textAlign='left' />
            <DualButtonFooter primaryTitle='Confirmar' onPressPrimary={this.handleFormSubmit} secondaryTitle='Cerrar Sesion' onPressSecondary={logout} />
        </SafeAreaView>
    );
}
