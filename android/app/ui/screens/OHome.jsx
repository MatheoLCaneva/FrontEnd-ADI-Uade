import React, {useState} from 'react';
import { View, Modal, Text, Pressable, StyleSheet, SafeAreaView, ImageBackground, Image, ToastAndroid, TouchableOpacity } from 'react-native';
import ButtonOwnerMini from '../components/ButtonOwnerMini';
import Popup from '../components/Popup';
import PopupOptions from '../components/PopupOptions';
import axios from 'axios';

export default function OwnerHome({navigation}) {

    
    const [data, setData] = React.useState({})

    const handleAddCine = () => {
        navigation.navigate('OWNER_ADD_CINE')
      };

    const handleModifyCine = () => {
        navigation.navigate('OWNER_MODIFY_CINE')
      };

    const handleRooms = () => {
        navigation.navigate('OWNER_ROOMS')
      };
      

    const handleProfile = () => {
        navigation.navigate('OWNER_PROFILE')
      };

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
            marginHorizontal: 20,
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
            textAlign: 'right'
        }, 
        lettertypeleft: {
            marginHorizontal: 20,
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
                <ButtonOwnerMini onPress={handleAddCine} marginTop={10} title='Agregar Cine +' />
                {/* <Text  style={{flexDirection: 'row'}}>  
                    <Text style={{alignContent:'flex-start', color: 'white'}}> Mis Cines </Text> <Text style={{alignContent:'flex-end', color: 'white'}}> Total: </Text>
                </Text> */}

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <Text style={styles.lettertypeleft}>Mis Cines</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <Text style={styles.lettertyperight}>Total:</Text>
                    </View>
                </View>

                <ButtonOwnerMini onPress={handleRooms} marginTop={10} title='PRUEBA SALA' />

                <ButtonOwnerMini onPress={handleProfile} marginTop={10} title='PRUEBA profile' />

                <ButtonOwnerMini onPress={handleModifyCine} marginTop={10} title='PRUEBA Modify Cine' />

                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}>
                        <PopupOptions><Text>POPUP DOS VALORES</Text></PopupOptions>
                    </View>
                    <View style={{flex: 1}}>
                        <Popup><Text>POP UP</Text></Popup>
                    </View>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
}
