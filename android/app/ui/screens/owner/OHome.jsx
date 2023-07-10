import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import CardCinema from '../../components/cards/CardCinema';
import { useSelector, useDispatch } from 'react-redux';
import { setCinema, setScreen } from '../../../redux/store';
import OListScreen from './OListScreen';
import NavigatorConstant from "../../../navigation/NavigatorConstant";

export default function OwnerHome({ navigation }) {
    const [cinemas, setCinemas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');

    const user = useSelector(state => state.user);

    const owner = useSelector(state => state.owner);

    const dispatch = useDispatch();

    const deleteCinema = async (cinema) => {
        try {
            const response = await axios.delete(
                `https://backend-adi-uade.onrender.com/cinemas/${cinema._id}`,
            );
            if(response.status === 200) {
                setCinemas(cinemas.filter(x => x._id !== cinema._id));
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
        const unsubscribe = navigation.addListener('focus', () => {
            setIsLoading(true);

            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `https://backend-adi-uade.onrender.com/cinemas/owner/${user._id}`,
                    );
                    setCinemas(response.data.data.docs);
                } catch (e) {
                    Alert.alert(
                        'Error',
                        'Ha ocurrido un error al importar sus cines, reintente en unos minutos.',
                    );
                } finally {
                    setIsLoading(false);
                }
            };

            fetchData();
        });
    
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {

    }, []);

    const handleCreateCinema = () => {
        navigation.push(NavigatorConstant.OWNER.CREATE_CINEMA);
    };
    const handleEditCinema = (cinema) => {
        dispatch(setCinema(cinema));
        navigation.push(NavigatorConstant.OWNER.EDIT_CINEMA)
    };
    const handleDeleteCinema = cinema => {
        dispatch(setCinema(cinema));
        setAlertText(`¿Está seguro que desea eliminar el cine "${cinema.name}"?`);
        setIsAlertVisible(true);
    };
    const handlePressCinema = cinema => {
        dispatch(setCinema(cinema));
        navigation.push(NavigatorConstant.OWNER.ROOMS_HOME);
    };
    const handlePressDeleteAlert = async result => {
        setIsAlertVisible(false);
        if (result) {
            setIsLoading(true);
            await deleteCinema(owner.cinema);
            setIsLoading(false);
        }
    };

    return (
        <OListScreen
            isAlertVisible={isAlertVisible}
            onPressDeleteAlert={handlePressDeleteAlert}
            alertText={alertText}
            isLoading={isLoading}
            buttonAddTitle={'Agregar Cines +'}
            screenName={'Mis Cines'}
            total={cinemas.length}
            onPressButtonAdd={handleCreateCinema}
            cards={cinemas.map((cinema, index) => {
                const activeRoomsCount = cinema.rooms.reduce((count, room) => {
                    if (room.status === true) {
                        return count + 1;
                    }
                    return count;
                }, 0);

                const roomsCount =
                    cinema.rooms.length > 1
                        ? cinema.rooms.length - 1
                        : cinema.rooms.length;

                return (
                    <CardCinema
                        key={index}
                        name={cinema.name}
                        address={cinema.address.name}
                        rooms={roomsCount}
                        activeRooms={activeRoomsCount}
                        onPress={() => handlePressCinema(cinema)}
                        onPressBtnEdit={() => handleEditCinema(cinema)}
                        onPressBtnDelete={() => handleDeleteCinema(cinema)}
                    />
                );
            })}
        />
    );
}
