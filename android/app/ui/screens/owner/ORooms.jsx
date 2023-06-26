import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import CardRoom from '../../components/cards/CardRoom';
import { useSelector, useDispatch } from 'react-redux';
import { setRoom } from '../../../redux/store';
import OListScreen from './OListScreen';

export default function OwnerRooms({ navigation }) {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');

    const cinema = useSelector(state => state.owner.cinema);
    const room = useSelector(state => state.owner.room);

    const dispatch = useDispatch();

    const deleteRoom = async (room) => {
        try {
            const response = await axios.delete(
                `https://backend-adi-uade.onrender.com/rooms/${room._id}`,
            );
            if(response.status === 200) {
                setRooms(rooms.filter(x => x._id !== room._id));
            }
        } catch (e) {
            Alert.alert(
                'Error',
                'Ha ocurrido un error al eliminar este cine, reintente en unos minutos.',
            );
        } finally {
        }
    }

    useEffect(() => {
        setIsLoading(true);
        navigation.setOptions({ title: `Salas de ${cinema.name}` });

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    `https://backend-adi-uade.onrender.com/rooms/cinema/${cinema._id}`,
                );
                setRooms(response.data.data.docs);
            } catch (e) {
                console.error(e);
                Alert.alert(
                    'Error',
                    'Ha ocurrido un error al importar sus salas, reintente en unos minutos.',
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [cinema, navigation]);

    const handleCreateRoom = () => {
        navigation.push('CREATE_ROOM');
    };
    const handleEditRoom = room => {
        navigation.push('EDIT_ROOM', { room });
    };
    const handleDeleteRoom = (room) => {
        dispatch(setRoom(room));
        setAlertText(`¿Está seguro que desea eliminar la sala "${room.name}"?`);
        setIsAlertVisible(true);
    };
    const handlePressRoom = (room) => {
        dispatch(setRoom(room));
        navigation.push('FUNCTIONS_HOME');
    };
    const handlePressDeleteAlert = async result => {
        setIsAlertVisible(false);
        if (result) {
            setIsLoading(true);
            await deleteRoom(room);
            setIsLoading(false);
        }
    };

    return (
        <OListScreen
            isAlertVisible={isAlertVisible}
            onPressDeleteAlert={handlePressDeleteAlert}
            alertText={alertText}
            isLoading={isLoading}
            buttonAddTitle={'Agregar Sala +'}
            screenName={'Mis Salas'}
            total={rooms.length}
            onPressButtonAdd={handleCreateRoom}
            cards={rooms.map(room => {
                return (
                    <CardRoom
                        key={room._id}
                        name={room.name}
                        status={room.status}
                        seats={room.seats.length}
                        onPress={() => handlePressRoom(room)}
                        onPressBtnEdit={() => handleEditRoom(room)}
                        onPressBtnDelete={() => handleDeleteRoom(room)}
                    />
                );
            })}
        />
    );
}
