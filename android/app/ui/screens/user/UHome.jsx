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

        // if (filterCinema && filterCinema !== 'Todos') {
        //     fetchFunctionsByCinema();

        // }
        if (filters) {
            if (Object.keys(filters).length === 0) {
                fetchFunctions();
            } else {
                fetchCinemas();
                fetchFunctionsWithFilter();
            }
        }
        else {
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

        const headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };

        const obj = Object.entries({
            'cinema.name': filters.cine?.name,
            'movie.genre': filters.genre,
            'movie.title': filters.movie?.title
        }).reduce((acc, [key, value]) => {
            if (value !== undefined) {
                acc[key] = value;
            }
            return acc;
        }, {});

        console.log('eee')

        try {
            const response = await axios.post('https://backend-adi-uade.onrender.com/functions/filters', obj, { headers });
            console.log('DATA____', response.data.data.docs)
            const functionsArray = response.data.data.docs;
            const filteredFunctions = functionsArray.reduce((accumulator, currentFunction) => {
                const existingFunction = accumulator.find((item) => item.movie._id === currentFunction.movie._id);
                if (!existingFunction) {
                    accumulator.push(currentFunction);
                }
                return accumulator;
            }, []);

            setFunctionsAll(functionsArray);
            setFunctions(filteredFunctions);
            setIsLoading(false);
        } catch (e) {
            ToastAndroid.show('Error al cargar las funciones disponibles', ToastAndroid.SHORT);
            console.error(e);
            setIsLoading(false);
            return false;
        }
    };

    const fetchFunctionsByCinema = async () => {
        try {
            console.log()
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
