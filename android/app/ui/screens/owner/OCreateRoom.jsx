import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Input from '../../components/Input';
import LoadingIndicator from '../../components/LoadingIndicator';
import DualButtonFooter from '../../components/DualButtonFooter';

export default function CreateRoom({ navigation }) {
    const user = useSelector(state => state.user);
    const owner = useSelector(state => state.owner);

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [rows, setRows] = useState('');
    const [columns, setColumns] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (text) => setName(text);
    const handlePriceChange = (text) => setPrice(text);
    const handleRowsChange = (text) => setRows(text);
    const handleColumnsChange = (text) => setColumns(text);

    const handleCreateRoom = async () => {
        if (name === '' || price === '' || rows === '' || columns === '') {
            Alert.alert('Error en los datos', 'Los campos no pueden estar vacíos.');
            return;
        }

        setIsLoading(true);

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const obj = {
            name: name,
            owner: user._id,
            cinema: owner.cinema._id,
            price: price,
            rows: rows,
            columns: columns
        };

        console.log(obj);

        try {
            const response = await axios.post(`https://backend-adi-uade.onrender.com/rooms/`, obj, { headers });
            if (response.data.status === 201) {
                ToastAndroid.show("Sala creada con éxito.", ToastAndroid.SHORT)
            }
            setIsLoading(false);
            /*navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'ROOMS_HOME', params: { transition: 'slide_from_left' }, }],
                })
            );*/
            navigation.goBack();
        } catch (e) {
            Alert.alert("Error", "Ha ocurrido un error al crear su sala, reintente en unos minutos.");
            setIsLoading(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        flexRow: {
            flex: 1,
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
        },
    });

    return (
        <View style={styles.container}>
            <View>
                <Input placeholder='Nombre' marginTop={77} onChangeText={handleNameChange} />
                <Input placeholder='Precio' marginTop={21} onChangeText={handlePriceChange} />
                <View style={styles.flexRow}>
                    <Input placeholder='Nro Columnas' marginTop={21} onChangeText={handleColumnsChange} />
                    <Input placeholder='Nro Filas' marginTop={21} onChangeText={handleRowsChange} />
                </View>

                <DualButtonFooter primaryTitle='Crear Sala' onPressPrimary={handleCreateRoom} secondaryTitle='Cancelar' onPressSecondary={() => navigation.goBack()} />
            </View>
            {isLoading && <LoadingIndicator />}
        </View>
    );
}
