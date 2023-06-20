import React, { useEffect, useState } from 'react';
import { View, Modal, Text, Pressable, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import ButtonOwnerMini from '../components/ButtonOwnerMini';
import axios from 'axios';

export default function OwnerHome({ route, navigation }) {

    const [user, setUser] = useState({})
    useEffect(() => {
        setUser(route.params.user)
        navigation.setOptions({ title: 'Hola ' + route.params.user.name })
    }, [route.params.user, navigation])



    const handlePressConfRecov = () => {
        navigation.navigate('CONFIRM_RECOVERY')
    };

    const [modalVisible, setModalVisible] = useState(false);


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
                {/* <Text  style={{flexDirection: 'row'}}>  
                    <Text style={{alignContent:'flex-start', color: 'white'}}> Mis Cines </Text> <Text style={{alignContent:'flex-end', color: 'white'}}> Total: </Text>
                </Text> */}

                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lettertypeleft}>Mis Cines</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.lettertyperight}>Total:</Text>
                    </View>
                </View>
                {/* <View styles={styles.container}>

                    <ButtonOwnerMini onPress={handlePressConfRecov} marginTop={10} title='Agregar Cine +' />
                    <Text style={styles.footer}>Mis cines</Text><Text style={styles.footer}>Total: X</Text>


                </View> */}

                {/* <View style={{flexDirection: 'row'}}>
                    <Text> Start here, </Text> <Text> finish here </Text>
                </View> */}
            </ImageBackground>
        </SafeAreaView>
    );
}
