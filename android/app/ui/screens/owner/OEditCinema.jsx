import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Input from '../../components/Input';
import { CommonActions } from '@react-navigation/native';
import LoadingIndicator from '../../components/LoadingIndicator';
import DualButtonFooter from '../../components/DualButtonFooter';

export default function CreateCinema({ navigation, route }) {
    const user = useSelector(state => state.user);

    let cinema = useSelector(state => state.owner.cinema)

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

    const handleEditCinema = async () => {
        setIsLoading(true)
        const updatedCinema = {
            ...cinema,
            name: name !== '' ? name : cinema.name || '',
            address: {
                ...cinema.address,
                name: address !== '' ? address : cinema.address.name || '',
                city: city !== '' ? city : cinema.address.city || '',
                district: district !== '' ? district : cinema.address.district || '',
                country: country !== '' ? country : cinema.address.country || '',
            },
        };

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };


        try {
            const response = await axios.put(`https://backend-adi-uade.onrender.com/cinemas/`, updatedCinema, { headers });
            if (response.data.status === 200) {
                ToastAndroid.show("Cine modificado con éxito.", ToastAndroid.SHORT)
                setIsLoading(false);
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'OWNER_HOME', params: { transition: 'slide_from_left' }, }],
                    })
                );
            }

        } catch (e) {
            console.log(e)
        }


    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        }
    });

    return (
        <View style={styles.container}>
            <View>
                <Input placeholder='Nombre' marginTop={77} onChangeText={handleNameChange} />
                <Input placeholder='Direccion' marginTop={21} onChangeText={handleAddressChange} />
                <Input placeholder='Ciudad' marginTop={21} onChangeText={handleCityChange} />
                <Input placeholder='Barrio' marginTop={21} onChangeText={handleDistrictChange} />
                <Input placeholder='Pais' marginTop={21} onChangeText={handleCountryChange} />
                <DualButtonFooter primaryTitle='Modificar Cine' onPressPrimary={handleEditCinema} secondaryTitle='Cancelar' onPressSecondary={() => navigation.goBack()} />
            </View>
            {isLoading && <LoadingIndicator />}
        </View>
    );
}
