import React, { useEffect, useState } from 'react';
import { View, Modal, Text, Pressable, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import ButtonOwnerMini from '../components/ButtonOwnerMini';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function OwnerHome({ navigation }) {

    const user = useSelector(state => state.user)
    useEffect(() => {
        navigation.setOptions({ title: 'Hola ' + user.name })
    }, [user, navigation])


    const handlePressConfRecov = () => {
        navigation.navigate('CONFIRM_RECOVERY')
    };

    const [modalVisible, setModalVisible] = useState(false);

    const cinemas = [
        { "_id": "646e6331f6eb1086044fb1c3", "name": "El Reproductor", "owner": "643461b7fc9b5f79e6ee4a4a", "address": { "name": "Av. Rivadavia 1234", "city": "Ciudad Autónoma de Buenos Aires", "district": "Congreso", "country": "Argentina" }, "location": { "lat": "-1234", "long": "1234" }, "__v": { "$numberInt": "0" } }
    ]

    console.log(cinemas[0].address.city)


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
        toggleButton: {
            alignSelf: 'center',
            marginTop: 10,
        },
        toggleButtonText: {
            fontSize: 16,
            color: '#E01D6F',
            textDecorationLine: 'underline',
        },
        lettertyperight: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
            textAlign: 'right'
        },
        lettertypeleft: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
        },
    });


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../assets/gradient.png')}
                style={styles.container}
            >
                <ButtonOwnerMini onPress={handlePressConfRecov} marginTop={10} title='Agregar Cine +' />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lettertypeleft}>Mis Cines</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lettertyperight}>Total:</Text>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
