import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, ToastAndroid, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Input from '../../components/Input';
import LoadingIndicator from '../../components/LoadingIndicator';
import { CommonActions } from '@react-navigation/native';
import DualButtonFooter from '../../components/DualButtonFooter';
import Dropdown from '../../components/Dropdown';
// import DatePicker from '../../components/DatePicker';
import format from 'date-fns/format';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import CustomAlert from '../../components/CustomAlert';


export default function EditFunction({ navigation }) {
    const cinema = useSelector(state => state.owner.cinema);
    const room = useSelector(state => state.owner.room)
    const func = useSelector(state => state.owner.function);
    console.log("🚀 ~ file: OEditFunction.jsx:19 ~ EditFunction ~ func:", func)

    const [movies, setMovies] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null)
    const [date, setDate] = useState(func.date); // Fecha actual
    const [time, setTime] = useState(func.hour);

    const [isAlertVisible, setAlertVisible] = useState(false);
    const [alertText, setAlertText] = useState("");


    const onDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setDate(currentDate);
        onSelectDateTime(currentDate, time); // Llama a la función de actualización del componente padre con fecha y hora
    };

    const onTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || time;
        setTime(currentTime);
    };

    const formatDate = () => {
        if(typeof date === 'string') {
            let dateArray = date.split('/');
            let day = parseInt(dateArray[0]);
            let month = parseInt(dateArray[1]) - 1;
            let year = new Date().getFullYear();
            return new Date(year, month, day);
        }
        else {
            return date;
        }
    }

    const showDatepicker = () => {
        DateTimePickerAndroid.open({
            value: formatDate(),
            onChange: onDateChange,
            mode: 'date',
            is24Hour: true,
        });
    };

    const formatTime = () => {
        let editableTime = new Date();
        if(typeof time === 'string') {
            let timeArray = time.split(':');
            editableTime.setHours(parseInt(timeArray[0]));
            editableTime.setMinutes(parseInt(timeArray[1]));
        }
        else {
            editableTime = time;
        }
        return editableTime;
    }

    const showTimepicker = () => {
        DateTimePickerAndroid.open({
            value: formatTime(),
            onChange: onTimeChange,
            mode: 'time',
            is24Hour: true,
        });
    };


    useEffect(() => {
        setIsLoading(true);
        navigation.setOptions({ title: `Funciones de ${room.name}` });

        const fetchData = async () => {
            try {
                //TODO: Están las funciones en el back?
                //Por si quiero ver todas las salas para probar
                const response = await axios.get(
                    `https://backend-adi-uade.onrender.com/movies/`,
                );
                setMovies(response.data.movies.docs)
            } catch (e) {
                console.error(e);
                Alert.alert(
                    'Error',
                    'Ha ocurrido un error al importar las películas, reintente en unos minutos.',
                );
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [room, navigation]);

    const handleEditFunction = async () => {
        if(selectedOption === null) {
            setAlertText("Por favor, seleccione una película");
            setAlertVisible(true);
            return;
        }

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const obj = {
            _id: func._id,
            cinema: cinema._id,
            room: room._id,
            movie: selectedOption,
            date: format(formatDate(), 'dd/MM').toString(),
            hour: format(formatTime(), 'HH:mm')
        };

        console.log(obj)

        try {
            const response = await axios.put(`https://backend-adi-uade.onrender.com/functions/`, obj, { headers });
            if (response.data.status === 200) {
                console.log(response.data)
                ToastAndroid.show("Función editada con éxito.", ToastAndroid.SHORT)
                setIsLoading(false);

                navigation.goBack();

            }
        } catch (e) {
            console.log(e)
            Alert.alert("Error", "Ha ocurrido un error al editar su función, reintente en unos minutos.");
            setIsLoading(false);
        }
    };

    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        containerPicker: {
            marginVertical: 10,
            marginHorizontal: 32,
        },
        dropdownButton: {
            backgroundColor: '#EFEFEF',
            paddingVertical: 10,
            paddingHorizontal: 12,
            borderRadius: 5,
        },
        dropdownButtonText: {
            fontSize: 16,
            color: '#555555',
        },
        dropdownButtonLabel: {
            fontSize: 16,
            color: '#FFFFFF',
            marginHorizontal: 32
        },
    });

    return (
        <View style={styles.container}>
            <View>
                <Input placeholder='Nombre' marginTop={77} value={cinema.name} editable={false} />
                <Input placeholder='Precio' marginTop={21} value={room.name} editable={false} />
                <Dropdown options={movies} aEditar={func.movie.title} selectedOption={selectedOption} onSelectOption={setSelectedOption} />
                <Text style={styles.dropdownButtonLabel}>Seleccionar Fecha</Text>
                <TouchableOpacity
                    style={[styles.containerPicker, styles.dropdownButton]}
                    onPress={showDatepicker}
                >
                    <Text style={styles.dropdownButtonText}>{(typeof date === 'string') ? date : format(date, 'dd/MM')}</Text>
                </TouchableOpacity>
                <Text style={styles.dropdownButtonLabel}>Seleccionar Hora</Text>
                <TouchableOpacity
                    style={[styles.containerPicker, styles.dropdownButton]}
                    onPress={showTimepicker}
                >
                    <Text style={styles.dropdownButtonText}>{(typeof time === 'string') ? time : format(new Date(time), 'HH:mm')}</Text>
                </TouchableOpacity>
                <DualButtonFooter primaryTitle='Editar Función' onPressPrimary={handleEditFunction} secondaryTitle='Cancelar' onPressSecondary={() => navigation.goBack()} />

            </View>
            {isAlertVisible && <CustomAlert text={alertText} primaryTitle='Aceptar' onPress={() => setAlertVisible(false)}/>}
            {isLoading && <LoadingIndicator />}
        </View>
    );
}
