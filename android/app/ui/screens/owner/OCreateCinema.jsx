import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView, ImageBackground, Alert, ActivityIndicator, ToastAndroid } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Input from '../../components/Input';
import ButtonAddDelete from '../../components/ButtonAddDeleteOwner';
import { CommonActions } from '@react-navigation/native';

export default function CreateCinema({ navigation }) {
    const user = useSelector(state => state.user);

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (text) => setName(text);
    const handleAddressChange = (text) => setAddress(text);
    const handleCityChange = (text) => setCity(text);
    const handleDistrictChange = (text) => setDistrict(text);
    const handleCountryChange = (text) => setCountry(text);

    const handleCreateCinema = async () => {
        if (address === '' || city === '' || district === '' || country === '') {
            Alert.alert('Error en los datos', 'Los campos no pueden estar vacíos (únicamente "Nombre").');
            return;
        }

        setIsLoading(true);

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        let cinemaName = name;
        if (name === '') {
            cinemaName = district;
        }

        const obj = {
            name: cinemaName,
            owner: user._id,
            address: {
                name: address,
                city: city,
                district: district,
                country: country,
            },
            location: {
                lat: "0",
                long: "0"
            }
        };

        try {
            const response = await axios.post(`https://backend-adi-uade.onrender.com/cinemas/`, obj, { headers });
            if (response.data.status === 201) {
                ToastAndroid.show("Cine creado con éxito.", ToastAndroid.SHORT)
            }
            setIsLoading(false);
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'OWNER_HOME', params: { transition: 'slide_from_left' }, }],
                })
            );
        } catch (e) {
            Alert.alert("Error", "Ha ocurrido un error al crear su cine, reintente en unos minutos.");
            setIsLoading(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        botones: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly'
        },
        loadingContainer: {
            ...StyleSheet.absoluteFill,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    return (
        <View style={styles.container}>
            <View>
                <Input placeholder='Nombre' marginTop={77} onChangeText={handleNameChange} />
                <Input placeholder='Direccion' marginTop={21} onChangeText={handleAddressChange} />
                <Input placeholder='Ciudad' marginTop={21} onChangeText={handleCityChange} />
                <Input placeholder='Barrio' marginTop={21} onChangeText={handleDistrictChange} />
                <Input placeholder='Pais' marginTop={21} onChangeText={handleCountryChange} />

                <View style={styles.botones}>
                    <ButtonAddDelete title='Crear Cine' color='#E01D6F' onPress={handleCreateCinema} />
                    <ButtonAddDelete title='Cancelar' color='#F0508C' />
                </View>
            </View>

            {isLoading && (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#ffffff" />
                </View>
            )}
        </View>
    );
}
