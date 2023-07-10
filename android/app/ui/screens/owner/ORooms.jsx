import React, { useEffect, useState } from 'react';
import { Alert, ToastAndroid, BackHandler } from 'react-native';
import { HeaderBackButton } from '@react-navigation/elements';
import axios from 'axios';
import CardRoom from '../../components/cards/CardRoom';
import { useSelector, useDispatch } from 'react-redux';
import { setRoom, setScreen } from '../../../redux/store';
import NavigatorConstant from "../../../navigation/NavigatorConstant";
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

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        try {
            const response = await axios.delete(
                `https://backend-adi-uade.onrender.com/rooms/${room._id}`,
            );
            if (response.status === 200) {
                setRooms(rooms.filter(x => x._id !== room._id));
                const updatedRooms = [...cinema.rooms];
                // Encontrar el índice de la sala eliminada en la copia del array
                const index = updatedRooms.findIndex(r => r._id === room._id);
                if (index !== -1) {
                    updatedRooms.splice(index, 1); // Eliminar la sala de la copia del array
                }
                cinema.rooms = updatedRooms;
                try {
                    const response = await axios.put(`https://backend-adi-uade.onrender.com/cinemas/`, cinema, { headers })
                    if (response.data.status === 200) {
                        ToastAndroid.show("Sala eliminada con éxito.", ToastAndroid.SHORT)
                    }
                } catch (e) {
                    console.error('error', e)
                }
            }
        } catch (e) {
            Alert.alert(
                'Error',
                'Ha ocurrido un error al eliminar esta sala, reintente en unos minutos.',
            );
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setIsLoading(true);
            dispatch(setScreen(NavigatorConstant.OWNER.ROOMS_HOME))
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
        });

        return unsubscribe;
    }, [navigation]);

    const backAction = () => {
        dispatch(setScreen(NavigatorConstant.OWNER.OWNER_HOME));
    };
    const completeBackAction = () => {
        dispatch(setScreen(NavigatorConstant.OWNER.OWNER_HOME));
        navigation.goBack();
    };

    useEffect(() => {
        dispatch(setScreen(NavigatorConstant.OWNER.ROOMS_HOME));

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

    const handleCreateRoom = () => {
        dispatch(setScreen(NavigatorConstant.OWNER.CREATE_ROOM))
        navigation.push('CREATE_ROOM');
    };
    const handleEditRoom = room => {
        dispatch(setRoom(room))
        dispatch(setScreen(NavigatorConstant.OWNER.EDIT_ROOM))
        navigation.push('EDIT_ROOM');

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
