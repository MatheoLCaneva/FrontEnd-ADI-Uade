import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ToastAndroid } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Input from '../../components/Input';
import NumericInput from '../../components/NumericInput';
import LoadingIndicator from '../../components/LoadingIndicator';
import DualButtonFooter from '../../components/DualButtonFooter';

export default function EditRoom({ navigation }) {
    const user = useSelector(state => state.user);
    const owner = useSelector(state => state.owner);
    const cinema = useSelector(state => state.owner.cinema);
    const room = useSelector(state => state.owner.room);

    const [name, setName] = useState(room.name);
    const [price, setPrice] = useState(String(room.price));
    const [rows, setRows] = useState('');
    const [columns, setColumns] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (text) => setName(text);
    const handlePriceChange = (text) => setPrice(text);
    const handleRowsChange = (text) => {
        if (text === '' || /^\d{0,2}$/.test(text)) {
            setRows(text);
        }
    };

    const handleColumnsChange = (text) => {
        if (text === '' || /^\d{0,2}$/.test(text)) {
            setColumns(text);
        }
    };

    const handleEditRoom = async () => {
        setIsLoading(true);

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const updatedRoom = {
            ...room,
            name: name !== '' ? name : room.name || '',
            price: price !== '' ? price : room.price || '',
        };

        try {
            const response = await axios.put(`https://backend-adi-uade.onrender.com/rooms/`, updatedRoom, { headers });
            if (response.data.status === 200) {
                // ToastAndroid.show("Sala modificada con éxito.", ToastAndroid.SHORT)
                try {
                    const updatedRooms = [...cinema.rooms];
                    console.log(updatedRooms)
                    // Encontrar el índice de la sala eliminada en la copia del array
                    const index = updatedRooms.findIndex(r => r._id === room._id);
                    if (index !== -1) {
                        updatedRooms.splice(index, 1);
                        updatedRooms.push(updatedRoom) // Eliminar la sala de la copia del array
                    }
                    cinema.rooms = updatedRooms;
                    try {
                        const response = await axios.put(`https://backend-adi-uade.onrender.com/cinemas/`, cinema, { headers })
                        if (response.data.status === 200) {
                            ToastAndroid.show("Sala modificada con éxito.", ToastAndroid.SHORT)
                        }
                    } catch (e) {
                        console.error('error', e)
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            setIsLoading(false);
            navigation.goBack();
        } catch (e) {
            Alert.alert("Error", "Ha ocurrido un error al modificar su sala, reintente en unos minutos.");
            setIsLoading(false);
        }
    };

    const handleStopRoom = async () => {
        // setIsLoading(true)

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const updatedRoom = {
            ...room,
            status: !room.status,
        };


        try {
            const response = await axios.put(`https://backend-adi-uade.onrender.com/rooms/`, updatedRoom, { headers });
            if (response.data.status === 200) {
                // ToastAndroid.show("Sala modificada con éxito.", ToastAndroid.LONG)
                try {
                    const updatedRooms = [...cinema.rooms];
                    console.log(updatedRooms)
                    // Encontrar el índice de la sala eliminada en la copia del array
                    const index = updatedRooms.findIndex(r => r._id === room._id);
                    if (index !== -1) {
                        updatedRooms.splice(index, 1);
                        updatedRooms.push(updatedRoom) // Eliminar la sala de la copia del array
                    }
                    cinema.rooms = updatedRooms;
                    try {
                        const response = await axios.put(`https://backend-adi-uade.onrender.com/cinemas/`, cinema, { headers })
                        if (response.data.status === 200) {
                            ToastAndroid.show("Sala modificada con éxito.", ToastAndroid.SHORT)
                        }
                    } catch (e) {
                        console.error('error', e)
                    }
                } catch (e) {
                    console.error(e)
                }
            }
            setIsLoading(false);
            navigation.goBack();
        } catch (e) {
            Alert.alert("Error", "Ha ocurrido un error al modificar su sala, reintente en unos minutos.");
            setIsLoading(false);
        }


    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        flexRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 0,
        },
    });

    return (
        <View style={styles.container}>
            <View>
                <Input placeholder='Nombre' marginTop={77} onChangeText={handleNameChange} value={name}/>
                <NumericInput placeholder='Precio' marginTop={21} onChangeText={handlePriceChange} value={price} />
                {/* <View style={styles.flexRow}>
                    <Input placeholder='Nro Columnas' marginTop={21} small onChangeText={handleColumnsChange} />
                    <Input placeholder='Nro Filas' marginTop={21} small onChangeText={handleRowsChange} />
                </View> */}
                <DualButtonFooter primaryTitle='Editar' onPressPrimary={handleEditRoom} secondaryTitle={room.status ? 'Desactivar' : 'Activar'}
                    onPressSecondary={() => handleStopRoom()} />
            </View>
            {isLoading && <LoadingIndicator />}
        </View>
    );
}
