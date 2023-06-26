import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import axios from 'axios';
import CardCinema from '../../components/cards/CardCinema';
import { useSelector, useDispatch } from 'react-redux';
import { setCinema } from '../../../redux/store';
import OListScreen from './OListScreen';

export default function OwnerHome({ navigation }) {

    const [cinemas, setCinemas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalText, setModalText] = useState("");

    const user = useSelector(state => state.user)

    const owner = useSelector(state => state.owner)

    const dispatch = useDispatch()

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
        dispatch(setCinema(cinema));
        navigation.push('EDIT_CINEMA')
    };
    const handleDeleteCinema = (cinema) => {
        dispatch(setCinema(cinema));
        setModalText(`¿Está seguro que desea eliminar el cine "${cinema.name}"?`);
        setIsModalVisible(true);
    };
    const handlePressCinema = (cinema) => {
        dispatch(setCinema(cinema));
        navigation.push('ROOMS_HOME');
    };
    const handlePressModal = (result) => {
        setIsModalVisible(false);
        if(result) {
            console.log("🚀 ~ file: OHome.jsx:64 ~ handlePressModal ~ owner.cinema:", owner.cinema)
        }
    };

    return (
        <OListScreen isModalVisible={isModalVisible} onPressModal={handlePressModal} modalText={modalText} isLoading={isLoading} buttonAddTitle={"Agregar Cines +"} screenName={"Mis Cines"} total={cinemas.length} onPressButtonAdd={handleCreateCinema}
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
                        onPressBtnDelete={() => handleDeleteCinema(cinema)}
                    />
                );
            })}
        />
    );
}
