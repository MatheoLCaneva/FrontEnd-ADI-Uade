import React, { useEffect, useState } from 'react';
import {
    View,
    Modal,
    Text,
    Pressable,
    StyleSheet,
    SafeAreaView,
    ImageBackground,
    Image,
    ToastAndroid,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import DualButtonFooter from '../../components/DualButtonFooter';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { setUser } from '../../../redux/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function UserProfile({ navigation }) {
    const user = useSelector(state => state.user);

    const [GivenName, setGivenName] = useState('');
    const [FamilyName, setFamilyName] = useState('');
  
    const handleGivenNameChange = (text) => setGivenName(text);
    const handleFamilyNameChange = (text) => setFamilyName(text);

    useEffect(() => {        
        navigation.setOptions({ headerTitle: 'Perfil de ' + user.name });
    }, []);
  
    const dispatch = useDispatch();
    //const navigation = useNavigation();

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
        disabledInput: {
            backgroundColor: 'gray',
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
        photo: {
            width: 150,
            height: 150,
            borderRadius: 150,
            borderWidth: 2,
            margin: 50,
            alignSelf: 'center',
            borderColor: '#dbdbdb',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    });

    return (

        <SafeAreaView style={{ flex: 1 }}>
            {user.imgUser && <Image source={{ uri: user.imgUser }} style={styles.photo} />}
            {!user.imgUser && <Image source={require("../../../assets/onlyLogo.png")} style={styles.photo} />}
            <TextInput
                style={styles.input}
                placeholderTextColor={'black'}
                textAlign='left'
                placeholder={user.name}
                onChangeText={handleGivenNameChange}
                editable={(user.rol === "User")}
            />
            <TextInput
                style={styles.input}
                placeholderTextColor={'black'}
                textAlign='left'
                placeholder={user.lastName}
                onChangeText={handleFamilyNameChange}
                editable={(user.rol === "User")}
            />
            <TextInput
                style={styles.disabledInput}
                placeholderTextColor={'black'}
                textAlign='left'
                placeholder={user.email}
                editable={false}
            />
            {(user.rol === "User") && (
                <DualButtonFooter
                    primaryTitle="Confirmar"
                    onPressPrimary={this.handleFormSubmit}
                    secondaryTitle="Cerrar Sesion"
                    onPressSecondary={logout}
                />
            )}
        </SafeAreaView>
    );
}
