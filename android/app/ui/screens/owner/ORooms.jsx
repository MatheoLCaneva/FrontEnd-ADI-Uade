import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import CardRoom from '../../components/cards/CardRoom';
import { useSelector } from 'react-redux';
import OListScreen from './OListScreen';

export default function OwnerRooms({ navigation }) {
    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const user = useSelector(state => state.user);

    useEffect(() => {
        setIsLoading(true);
        navigation.setOptions({ title:  `Salas de `});

        const fetchData = async () => {
            try {
                const response = await axios.get(
                    //`https://backend-adi-uade.onrender.com/rooms/${user._id}`,
                    `https://backend-adi-uade.onrender.com/rooms`,
                );
                console.log(response.data.Rooms.docs);
                setRooms(response.data.Rooms.docs);
            } catch (e) {
                Alert.alert(
                    'Error',
                    'Ha ocurrido un error al importar sus salas, reintente en unos minutos.',
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user, navigation]);

    const handleCreateRoom = () => {
        navigation.push('CREATE_ROOM');
    };
    const handleEditRoom = room => {
        navigation.push('EDIT_ROOM', { room });
    };
    const handleDeleteRoom = () => {
        navigation.push('CREATE_ROOM');
    };

    return (
        <OListScreen
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
                        onPress={() => {}}
                        onPressBtnEdit={() => handleEditRoom(room)}
                        onPressBtnDelete={handleDeleteRoom}
                    />
                );
            })}
        />
    );
}
