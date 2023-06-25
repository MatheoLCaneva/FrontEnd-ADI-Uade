import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import CardCinema from '../../components/cards/CardCinema';
import { useSelector } from 'react-redux';
import OListScreen from './OListScreen';

export default function OwnerHome({ navigation }) {

    const [cinemas, setCinemas] = useState([])
    const [isLoading, setIsLoading] = useState(false);


    const user = useSelector(state => state.user)

    useEffect(() => {
        setIsLoading(true)
        navigation.setOptions({ title: 'Hola ' + user.name })


        const fetchData = async () => {
            try {
                const response = await axios.get(`https://backend-adi-uade.onrender.com/cinemas/owner/${user._id}`);
                setCinemas(response.data.data.docs);
            } catch (e) {
                Alert.alert("Error", "Ha ocurrido un error al importar sus cines, reintente en unos minutos.");
            }
            finally {
                setIsLoading(false)
            }
        };

        fetchData()

    }, [user, navigation])

    const handleCreateCinema = () => {
        navigation.push('CREATE_CINEMA')
    };
    const handleEditCinema = (cinema) => {
        navigation.push('EDIT_CINEMA', { cinema })
    };
    const handleDeleteCinema = () => {
        navigation.push('CREATE_CINEMA')
    };
    const handlePressCinema = (cinema) => {
        console.log(cinema);
        navigation.push('ROOMS_HOME', { cinema });
    };

    return (
        <OListScreen isLoading={isLoading} buttonAddTitle={"Agregar Cines +"} screenName={"Mis Cines"} total={cinemas.length} onPressButtonAdd={handleCreateCinema}
            cards={cinemas.map(cinema => {
                const activeRoomsCount = cinema.rooms.reduce((count, room) => {
                    if (room.status === true) {
                        return count + 1;
                    }
                    return count;
                }, 0);

                const roomsCount = cinema.rooms.length > 1 ? cinema.rooms.length - 1 : cinema.rooms.length;

                return (
                    <CardCinema
                        key={cinema._id}
                        name={cinema.name}
                        address={cinema.address.name}
                        rooms={roomsCount}
                        activeRooms={activeRoomsCount}
                        onPress={() => handlePressCinema(cinema)}
                        onPressBtnEdit={() => handleEditCinema(cinema)}
                        onPressBtnDelete={handleDeleteCinema}
                    />
                );
            })}
        />
    );
}
