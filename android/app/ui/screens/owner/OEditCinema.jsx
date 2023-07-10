import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ToastAndroid, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setScreen } from '../../../redux/store';
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import Input from '../../components/Input';
import LoadingIndicator from '../../components/LoadingIndicator';
import DualButtonFooter from '../../components/DualButtonFooter';
import AddressAutocomplete from '../../components/InputAddress/Index';
import CustomAlert from '../../components/CustomAlert';

export default function CreateCinema({ navigation, route }) {

    let cinema = useSelector(state => state.owner.cinema)
    const dispatch = useDispatch();

    const [name, setName] = useState(cinema.name);
    const [address, setAddress] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState("");

    const handleNameChange = (text) => setName(text);
    const handleAddressChange = (text) => setAddress(text);

    const handleEditCinema = async () => {
        if(name === '') {
            setAlertText("Por favor, ingrese un nombre de cine");
            setAlertVisible(true);
            return;
        }
        if(address === undefined) {
            setAlertText("Por favor, ingrese la dirección del cine");
            setAlertVisible(true);
            return;
        }

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
                navigation.goBack();
            }

        } catch (e) {
            console.log(e)
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
        dispatch(setScreen(NavigatorConstant.OWNER.EDIT_CINEMA));

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
        }
    });

    return (
        <View style={styles.container}>
            <View>
                <Input placeholder='Nombre' marginTop={77} onChangeText={handleNameChange} value={name} editable={true}/>
                <AddressAutocomplete placeHolderText="Ingrese la ubicación" target="origin" />
                <DualButtonFooter primaryTitle='Modificar Cine' onPressPrimary={handleEditCinema} secondaryTitle='Cancelar' onPressSecondary={completeBackAction} />
            </View>
            {isAlertVisible && <CustomAlert text={alertText} primaryTitle='Aceptar' onPress={() => setAlertVisible(false)}/>}
            {isLoading && <LoadingIndicator />}
        </View>
    );
}
