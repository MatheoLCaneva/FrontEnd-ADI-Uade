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
    // const address = useSelector(state => state.owner.cinemaAddress)
    const [address, setAddress] = useState({});
    const [name, setName] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [country, setCountry] = useState('');

    // useEffect(() => {
    //     setCity(address.properties.city)
    //     setDistrict(address.properties.suburb ? address.properties.suburb : address.properties.county)
    //     setCountry(address.properties.country)
    // }, [address])


    const handleNameChange = (text) => setName(text);

    const handleCreateCinema = async () => {

        console.log(address)
        // setIsLoading(true);
        // const headers = {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        // };

        // const obj = {
        //     name: name,
        //     owner: user._id,
        //     address: {
        //         name: address.properties.address_line1,
        //         city: city,
        //         district: district,
        //         country: country,
        //     },
        //     location: {
        //         lat: address.properties.lat,
        //         long: address.properties.lon
        //     }
        // };

        // console.log(obj)

        // try {
        //     const response = await axios.post(`https://backend-adi-uade.onrender.com/cinemas/`, obj, { headers });
        //     if (response.data.status === 201) {
        //         ToastAndroid.show("Cine creado con éxito.", ToastAndroid.SHORT)
        //     }
        //     setIsLoading(false);
        //     navigation.dispatch(
        //         CommonActions.reset({
        //             index: 0,
        //             routes: [{ name: 'OWNER_HOME', params: { transition: 'slide_from_left' }, }],
        //         })
        //     );
        // } catch (e) {
        //     Alert.alert("Error", "Ha ocurrido un error al crear su cine, reintente en unos minutos.");
        //     setIsLoading(false);
        // }
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
                {/* <KeyboardAwareScrollView> */}
                    <Input placeholder='Nombre' marginTop={77} editable={true} onChangeText={handleNameChange} />
                    {/* <AddressAutocomplete placeHolderText="Ingrese la ubicación" target="origin" /> */}
                    <View style={styles.container}>
                        <GooglePlacesAutocomplete
                            placeholder='Search'
                            textInputProps={{ placeholderTextColor: 'black', cursorColor: 'black' }}
                            fetchDetails={true}
                            styles={{
                                textInput: {
                                    backgroundColor: 'white',
                                    borderRadius: 20,
                                    marginTop: 32,
                                    marginHorizontal: 32,
                                    paddingLeft: 20,
                                    color: 'black'
                                },
                                description: {
                                    color: 'black'
                                },
                                keyboardAvoidingContainer: {
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                },
                                listView: {
                                    backgroundColor: 'white',
                                    marginHorizontal: 30,
                                    marginTop: 5,
                                }
                            }}

                            onPress={(data, details = null) => {
                                setAddress(details)
                                // handleAddressChange(details)
                            }}

                            query={{
                                key: 'AIzaSyCldpYhbjqR9JMKXBdEEagYWxnqlS1jyAA',
                                language: 'es',
                            }}

                            onFail={error => console.log(error)} onNotFound={() => console.log('no results')}
                        />
                    </View>
                    {/* <GooglePlacesAutocomplete
                    placeholder='Search'
                    textInputProps={{ placeholderTextColor: 'black', cursorColor: 'black' }}
                    fetchDetails={true}
                    styles={{
                        textInput: {
                            backgroundColor: 'white',
                            borderRadius: 20,
                            marginTop: 32,
                            marginHorizontal: 32,
                            paddingLeft: 20,
                            color: 'black'
                        },
                        description: {
                            color: 'black'
                        },
                        keyboardAvoidingContainer: {
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                        },
                    }}

                    onPress={(data, details = null) => {
                        handleAddressChange(details)
                    }}

                    query={{
                        key: 'AIzaSyCldpYhbjqR9JMKXBdEEagYWxnqlS1jyAA',
                        language: 'es',
                    }}

                    onFail={error => console.log(error)} onNotFound={() => console.log('no results')}
                /> */}

                    <DualButtonFooter primaryTitle='Crear Cine' onPressPrimary={handleCreateCinema} secondaryTitle='Cancelar' onPressSecondary={completeBackAction} />
                    {isLoading && <LoadingIndicator />}
                {/* </KeyboardAwareScrollView> */}
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}
