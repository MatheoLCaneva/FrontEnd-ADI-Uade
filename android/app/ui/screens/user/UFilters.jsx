import React, { useEffect, useState } from 'react';
import { useNavigation, CommonActions } from '@react-navigation/native';
import axios from 'axios';
import { View, Text, StyleSheet, SafeAreaView, ToastAndroid } from 'react-native';
import DropdownUserFilter from '../../components/DropdownUserFilter';
import { useDispatch } from 'react-redux';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import { setFilters, setFunctionsByMovie } from '../../../redux/store';
import { Rating } from 'react-native-elements';
import ButtonPrimary from '../../components/ButtonPrimary';

export default function UFilters(props) {
    const [cinemas, setCinemas] = useState([]);
    const [movies, setMovies] = useState([]);
    const [genre, setGenre] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [genreDisabled, setGenreDisabled] = useState(false);
    const [movieDisabled, setMovieDisabled] = useState(false);
    const [filter, setFilter] = useState(null);
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const distance = ['-1KM', '1KM-2KM', '+2KM']

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Filtros '
        });
        setIsLoading(true)

        if (filter) {
            if (filter.cine && !filter.movie) {
                fetchFunctionsByCinema();
            }
            else if (filter.movie) {
                setGenreDisabled(true)
            }
            else {
                setGenreDisabled(false)
                fetchCinemas();
                fetchMovies();

            }
        }
        else {
            fetchCinemas();
            fetchMovies();
        }

    }, [filter]);

    const fetchFunctionsByCinema = async () => {
        try {
            const response = await axios.get(`https://backend-adi-uade.onrender.com/functions/cinema/${filter.cine._id}`);
            if (response.data.data.docs.length !== 0) {
                const functionsArray = response.data.data.docs;
                const filteredFunctions = functionsArray.reduce((accumulator, currentFunction) => {
                    const existingFunction = accumulator.find(item => item._id === currentFunction.movie._id);
                    if (!existingFunction) {
                        accumulator.push(currentFunction.movie);
                    }
                    return accumulator;
                }, []);
                setMovies(filteredFunctions)
                setMovieDisabled(false)
                setGenreDisabled(false)
            }
            else {
                setMovieDisabled(true)
                setGenreDisabled(true)
                ToastAndroid.show('No existen películas para el cine seleccionado', ToastAndroid.SHORT)
            }
        } catch (e) {
            ToastAndroid.show('Error al cargar las funciones disponibles', ToastAndroid.SHORT);
        }
        finally {
            setIsLoading(false)
        }
    };

    const fetchMovies = async () => {
        try {
            const response = await axios.get('https://backend-adi-uade.onrender.com/movies/');
            const moviesArray = response.data.movies.docs;
            setMovies(moviesArray);
            setIsLoading(false);

            const allGenres = [];

            moviesArray.forEach((item) => {
                item.genre.forEach((genre) => {
                    if (!allGenres.includes(genre)) {
                        allGenres.push(genre);
                    }
                });
            });
            setGenre(allGenres)
            setIsLoading(false);

        } catch (e) {
            ToastAndroid.show('Error al cargar las peliculas disponibles', ToastAndroid.SHORT);
            setIsLoading(false);
        }
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

    const handleSelectOption = (tipo, option) => {
        if (option.name == 'Todos' || option.title == 'Todas' || option == 'Todos') {
            setFilter(prevFilters => {
                const newFilters = { ...prevFilters };
                delete newFilters[tipo];
                return newFilters;
            });
        } else {

            if (option.title) {
                setFilter(prevFilters => {
                    const newFilters = { ...prevFilters }
                    delete newFilters['genre']
                    return newFilters
                })
            }
            setFilter(prevFilters => ({
                ...prevFilters,
                [tipo]: option
            }));
        }
    };

    const handleSelectFilters = () => {
        dispatch(setFilters(filter));
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: NavigatorConstant.NAVIGATOR.USERS_TAB_HOME }]
            })
        );
    };

    const handleUndoFilters = () => {
        dispatch(setFilters(undefined))
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: NavigatorConstant.NAVIGATOR.USERS_TAB_HOME }]
            })
        );
    }

    const styles = StyleSheet.create({
        filtersContainer: {
            marginTop: 47
        }
    })

    return (

        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.filtersContainer}>
                <DropdownUserFilter label='Seleccionar un cine' options={[{ name: 'Todos' }, ...cinemas]} selectedOption={filter} onSelectOption={(option) => handleSelectOption('cine', option)} tipo={'cine'} />
                <DropdownUserFilter disabled={movieDisabled} options={[{ title: 'Todas' }, ...movies]} selectedOption={filter} onSelectOption={(option) => handleSelectOption('movie', option)} tipo={'pelicula'} />
                <DropdownUserFilter disabled={genreDisabled} label='Seleccionar un genero' options={['Todos', ...genre]} selectedOption={filter} onSelectOption={(option) => handleSelectOption('genre', option)} tipo={'genero'} />
                <DropdownUserFilter disabled={movieDisabled} options={distance} selectedOption={filter} onSelectOption={(option) => handleSelectOption('distance', option)} tipo={'distancia'} />
                <ButtonPrimary disabled={filter == null} title='Aplicar Filtros' onPress={handleSelectFilters} />
                <ButtonPrimary title='Deshacer Filtros' onPress={handleUndoFilters} />
            </View>
        </SafeAreaView>

    );
}


