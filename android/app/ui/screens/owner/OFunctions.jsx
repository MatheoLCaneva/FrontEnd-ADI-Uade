import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import CardFunction from '../../components/cards/CardFunction';
import { useSelector, useDispatch } from 'react-redux';
import { setFunction } from '../../../redux/store';
import OListScreen from './OListScreen';

export default function OwnerFunctions({ navigation }) {
    const [funcs, setFunctions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const room = useSelector(state => state.owner.room);

    const dispatch = useDispatch();

    useEffect(() => {
        setIsLoading(true);
        navigation.setOptions({ title: `Funciones de ${room.name}` });

        const fetchData = async () => {
            try {
                
                //TODO: Están las funciones en el back?
                //Por si quiero ver todas las salas para probar
                const response = await axios.get(
                    `https://backend-adi-uade.onrender.com/functions/room/${room._id}`,
                );
                console.log(response.data.data.docs);
                setFunctions(response.data.data.docs);
            } catch (e) {
                console.error(e);
                Alert.alert(
                    'Error',
                    'Ha ocurrido un error al importar sus funciones para esta sala, reintente en unos minutos.',
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [room, navigation]);

    const handleCreateRoom = () => {
        navigation.push('CREATE_FUNCTION');
    };
    const handleEditRoom = room => {
        navigation.push('EDIT_FUNCTION', { room });
    };
    const handleDeleteRoom = () => {
        navigation.push('CREATE_FUNCTION');
    };

    return (
        <OListScreen
            isLoading={isLoading}
            buttonAddTitle={'Agregar Función +'}
            screenName={'Mis Funciones'}
            total={funcs.length}
            onPressButtonAdd={handleCreateRoom}
            cards={funcs.map(func => {
                return (
                    <CardFunction
                        key={func._id}
                        name={func.name}
                        date={new Date().getTime()}
                        occupiedSeats={"NONE"}
                        onPress={() => {}}
                        onPressBtnEdit={() => handleEditRoom(func)}
                        onPressBtnDelete={handleDeleteRoom}
                    />
                );
            })}
        />
    );
}
