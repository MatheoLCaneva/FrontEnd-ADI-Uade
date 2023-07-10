import { useIsFocused, useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, FlatList, ToastAndroid, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import CardFunctionUser from '../../components/cards/CardFunctionUser';
import Dropdown from '../../components/Dropdown';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useDispatch } from 'react-redux';
import { setMovie, setScreenUser } from '../../../redux/store/';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import { setFunctionsByMovie, setLocation } from '../../../redux/store';
import Geolocation from '@react-native-community/geolocation';

export default function UserHome() {
    const [functions, setFunctions] = useState([]);
    const [functionsAll, setFunctionsAll] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterCinema, setFilterCinema] = useState(null);
    const [cineDisabled, setCineDisaled] = useState(false);
    const user = useSelector(state => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const filters = useSelector(state => state.client.filters);
    const ubi = useSelector(state => state.client.location)

    useEffect(() => {
        Geolocation.getCurrentPosition(info => dispatch(setLocation(info.coords)));
        navigation.setOptions({
            headerTitle: 'Hola ' + user.name
        });

        setIsLoading(true);

        if (filterCinema && filterCinema !== 'Todos') {
            fetchFunctionsByCinema();

        } else if (filters) {
            if (Object.keys(filters).length === 0) {
                fetchFunctions();
            } else {
                fetchCinemas();
                fetchFunctionsWithFilter();
            }
        } else {
            fetchFunctions();
            fetchCinemas();
        }

    }, [filters, filterCinema]);

    const fetchFunctions = async () => {
        try {
            const response = await axios.get('https://backend-adi-uade.onrender.com/functions/');
            const functionsArray = response.data.Functions.docs;
            setFunctionsAll(functionsArray);
            const filteredFunctions = functionsArray.reduce((accumulator, currentFunction) => {
                const existingFunction = accumulator.find(item => item.movie._id === currentFunction.movie._id);
                if (!existingFunction) {
                    accumulator.push(currentFunction);
                }
                return accumulator;
            }, []);
            setFunctions(filteredFunctions);
            setIsLoading(false);
        } catch (e) {
            ToastAndroid.show('Error al cargar las funciones disponibles', ToastAndroid.SHORT);
            console.log(e);
            setIsLoading(false);
            return false;
        }
    };

    const fetchFunctionsWithFilter = async () => {
        try {
            const response = await axios.get('https://backend-adi-uade.onrender.com/functions/');
            const functionsArray = response.data.Functions.docs;
            setFunctionsAll(functionsArray);
            const filteredFunctions = checkFilters(filters, functionsArray);
            console.log(filteredFunctions)
            setFunctions(filteredFunctions);
            setIsLoading(false);
        } catch (e) {
            ToastAndroid.show('Error al cargar las funciones disponibles', ToastAndroid.SHORT);
            console.log(e);
            setIsLoading(false);
            return false;
        }
    };

    const fetchFunctionsByCinema = async () => {
        try {
            const response = await axios.get(`https://backend-adi-uade.onrender.com/functions/cinema/${filterCinema._id}`);
            if (response.data.data) {
                const functionsArray = response.data.data.docs;
                const filteredFunctions = checkFilters(filters, functionsArray)
                setFunctionsAll(functionsArray);
                setFunctions(filteredFunctions);
                setIsLoading(false);
            } else {
                console.log('No functions');
                setFunctions(response.data.Functions);
                ToastAndroid.show('No existen películas para el cine seleccionado', ToastAndroid.SHORT);
            }
        } catch (e) {
            ToastAndroid.show('Error al cargar las funciones disponibles', ToastAndroid.SHORT);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSelectMovie = (item) => {
        dispatch(setMovie(item.movie));
        const functions = functionsAll.filter(func => func.movie.title === item.movie.title);
        dispatch(setFunctionsByMovie(functions));
        dispatch(setScreenUser(NavigatorConstant.USER.MOVIE));
        navigation.navigate('MOVIE_DETAIL');
    };

    const renderFunction = ({ item }) => {
        return <CardFunctionUser onPress={() => handleSelectMovie(item)} functions={item} />;
    };

    const fetchCinemas = async () => {
        try {
            const response = await axios.get('https://backend-adi-uade.onrender.com/cinemas/');
            const cinemasArray = response.data.Cinemas.docs;

            setCinemas(cinemasArray);
            setIsLoading(false);
        } catch (e) {
            ToastAndroid.show('Error al cargar los cines disponibles', ToastAndroid.SHORT);
            setIsLoading(false);
        }
    };

    const keyExtractor = (item) => item._id.toString();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 21
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 14,
            letterSpacing: 2
        }
    });

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenWidth < screenHeight;
    const numColumns = isPortrait ? 2 : 3;

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radio de la Tierra en kilómetros

        const degToRad = (degrees) => {
            return degrees * (Math.PI / 180);
        };

        const dLat = degToRad(lat2 - lat1);
        const dLon = degToRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(degToRad(lat1)) *
            Math.cos(degToRad(lat2)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;

        return distance;
    };

    const checkFilters = (filters, functions) => {
        const { cine, movie, genre, distance } = filters;

        if (!cine && !movie && !genre && !distance) {
            const filteredFunctions = functions.reduce((accumulator, currentFunction) => {
                const existingFunction = accumulator.find((item) => item.movie._id === currentFunction.movie._id);
                if (!existingFunction) {
                    accumulator.push(currentFunction);
                }
                return accumulator;
            }, []);

            return filteredFunctions;
        }

        const func = functions.filter((func) => {
            const matchCine = !cine || func.cinema.name === cine.name;
            const matchMovie = !movie || func.movie.title === movie.title;
            const matchGenre = !genre || func.movie.genre.includes(genre);

            let withinDistance = false;

            if (distance === "-1KM") {
                // Comparar si la distancia es menor a 1 kilómetro
                withinDistance = calculateDistance(
                    ubi.latitude,
                    ubi.longitude,
                    func.cinema.location.lat,
                    func.cinema.location.long
                ) < 1;
            } else if (distance === "1KM-2KM") {
                // Comparar si la distancia está entre 1 y 2 kilómetros (inclusive)
                const funcDistance = calculateDistance(
                    ubi.latitude,
                    ubi.longitude,
                    func.cinema.location.lat,
                    func.cinema.location.long
                );
                withinDistance = funcDistance >= 1 && funcDistance <= 2;
            } else if (distance === "+2KM") {
                // Comparar si la distancia es mayor a 2 kilómetros
                withinDistance = calculateDistance(
                    ubi.latitude,
                    ubi.longitude,
                    func.cinema.location.lat,
                    func.cinema.location.long
                ) > 2;
            } else {
                // Opción de distancia no válida, se considera como fuera de distancia
                withinDistance = false;
            }

            return matchCine && matchMovie && matchGenre && withinDistance;
        });

        const filteredFunctions = func.reduce((accumulator, currentFunction) => {
            const existingFunction = accumulator.find((item) => item.movie._id === currentFunction.movie._id);
            if (!existingFunction) {
                accumulator.push(currentFunction);
            }
            return accumulator;
        }, []);

        return filteredFunctions;
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <View>
                    <Text style={styles.title}>
                        Películas
                    </Text>
                    <Dropdown disabled={cineDisabled} label="Seleccionar Cine" options={["Todos", ...cinemas]} selectedOption={filterCinema} onSelectOption={setFilterCinema} tipo={"cine"} />
                </View>
                {isLoading ? (
                    <LoadingIndicator />
                ) : (
                    functions.length > 0 ? (
                        // Renderizar contenido cuando isLoading es false y functions tiene elementos
                        <FlatList
                            data={functions}
                            renderItem={renderFunction}
                            keyExtractor={keyExtractor}
                            numColumns={numColumns}
                        />
                    ) : (
                        // Renderizar contenido cuando isLoading es false pero functions está vacío
                        <Text>No hay funciones disponibles para los filtros seleccionados</Text>
                    )
                )}
            </ImageBackground>
        </SafeAreaView>
    );
}
