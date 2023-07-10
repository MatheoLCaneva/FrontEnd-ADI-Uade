import React, { useEffect, useState } from 'react';
import { Alert, ToastAndroid } from 'react-native';
import axios from 'axios';
import CardFunction from '../../components/cards/CardFunction';
import { useSelector, useDispatch } from 'react-redux';
import { setFunction, setScreen } from '../../../redux/store';
import OListScreen from './OListScreen';
import NavigatorConstant from '../../../navigation/NavigatorConstant';

export default function OwnerFunctions({ navigation }) {
    const [funcs, setFunctions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState('');
    const room = useSelector(state => state.owner.room);
    const func = useSelector(state => state.owner.function);


    const dispatch = useDispatch();

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setScreen(NavigatorConstant.OWNER.FUNCTIONS_HOME))
            setIsLoading(true);
            navigation.setOptions({ title: `Funciones de ${room.name}` });

            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `https://backend-adi-uade.onrender.com/functions/room/${room._id}`,
                    );
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
        });

        return unsubscribe;
    }, [navigation]);

    const deleteFunc = async (func) => {

        try {
            const response = await axios.delete(
                `https://backend-adi-uade.onrender.com/functions/${func._id}`,
            );
            if (response.status === 200) {
                setFunctions(funcs.filter(x => x._id !== func._id));
                ToastAndroid.show("Función eliminada con éxito.", ToastAndroid.SHORT)
            }
        } catch (e) {
            ToastAndroid.show("Error eliminando la función. Reintente en unos minutos.", ToastAndroid.SHORT)
        }
    }

    const handleCreateFunction = () => {
        navigation.push('CREATE_FUNCTION');
        dispatch(setScreen(NavigatorConstant.OWNER.CREATE_FUNCTION))
    };
    const handleEditFunction = func => {
        dispatch(setFunction(func));
        navigation.push('EDIT_FUNCTION');
        dispatch(setScreen(NavigatorConstant.OWNER.EDIT_FUNCTION))
    };
    const handleDeleteFunc = (func) => {
        dispatch(setFunction(func));
        setAlertText(`¿Está seguro que desea eliminar la función "${func.movie.title}"?`);
        setIsAlertVisible(true);
    };

    const handlePressDeleteAlert = async result => {
        setIsAlertVisible(false);
        if (result) {
            setIsLoading(true);
            await deleteFunc(func);
            setIsLoading(false);
        }
    };
    return (
        <OListScreen
            isLoading={isLoading}
            isAlertVisible={isAlertVisible}
            onPressDeleteAlert={handlePressDeleteAlert}
            alertText={alertText}
            buttonAddTitle={'Agregar Función +'}
            screenName={'Mis Funciones'}
            total={funcs.length}
            onPressButtonAdd={handleCreateFunction}
            cards={funcs.map(func => {
                return (
                    <CardFunction
                        key={func._id}
                        name={func.movie ? func.movie.title : "ERROR DE PELI"}
                        date={func.date}
                        hour={func.hour}
                        occupiedSeats={"0"}
                        onPress={() => { }}
                        onPressBtnEdit={() => handleEditFunction(func)}
                        onPressBtnDelete={() => handleDeleteFunc(func)}
                    />
                );
            })}
        />
    );
}
