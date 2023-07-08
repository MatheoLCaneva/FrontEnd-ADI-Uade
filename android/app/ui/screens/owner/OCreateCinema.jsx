import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ToastAndroid, BackHandler, TouchableWithoutFeedback, Keyboard } from 'react-native';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import Input from '../../components/Input';
import LoadingIndicator from '../../components/LoadingIndicator';
import { CommonActions } from '@react-navigation/native';
import { HeaderBackButton } from '@react-navigation/elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DualButtonFooter from '../../components/DualButtonFooter';
import { setScreen } from '../../../redux/store';
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView } from 'react-native-safe-area-context';
import AddressAutocomplete from '../../components/InputAddress/Index';

export default function CreateCinema({ navigation }) {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch();
    const address = useSelector(state => state.owner.cinemaAddress)
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');

    const handleNameChange = (text) => setName(text);

    const handleCreateCinema = async () => {

        // setIsLoading(true);
        console.log(address.properties)
        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const obj = {
            name: name !== '' ? name : address.properties.suburb ? address.properties.suburb : address.properties.county,
            owner: user._id,
            address: {
                name: address.properties.address_line1,
                city: address.properties.city,
                district: address.properties.suburb ? address.properties.suburb : address.properties.county,
                country: address.properties.country,
            },
            location: {
                lat: address.properties.lat,
                long: address.properties.lon
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

    const backAction = () => {
        dispatch(setScreen(NavigatorConstant.OWNER.OWNER_HOME));
    };
    const completeBackAction = () => {
        dispatch(setScreen(NavigatorConstant.OWNER.OWNER_HOME));
        navigation.goBack();
    };

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        navigation.setOptions({
            headerLeft: (props) => (
                <HeaderBackButton
                    {...props}
                    onPress={completeBackAction}
                />
            )
        });

        return () => backHandler.remove();
    }, []);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'column'
        },
    });

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <SafeAreaView style={styles.container}>
                <Input placeholder='Nombre' marginTop={77} editable={true} onChangeText={handleNameChange} />
                <AddressAutocomplete placeHolderText="Ingrese la ubicación" target="origin" />
                <DualButtonFooter primaryTitle='Crear Cine' onPressPrimary={handleCreateCinema} secondaryTitle='Cancelar' onPressSecondary={completeBackAction} />
                {isLoading && <LoadingIndicator />}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
