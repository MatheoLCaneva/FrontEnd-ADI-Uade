import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, FlatList, ToastAndroid, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import CardFunctionUser from '../../components/cards/CardFunctionUser';
import DropdownUserFilter from '../../components/DropdownUserFilter';
import LoadingIndicator from '../../components/LoadingIndicator';
import { useDispatch } from 'react-redux';
import {setMovie, setScreenUser } from '../../../redux/store/';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import { setFunctionsByMovie } from '../../../redux/store';
import { Rating } from 'react-native-elements';
import Logo from '../../components/Logo';

export default function UFilters(props) {
    const [functions, setFunctions] = useState([]);
    const [functionsAll, setFunctionsAll] = useState([]);    
    const [cinemas, setCinemas] = useState([]);
    const [movies, setMovies] = useState([]);    
    const [genre, setGenre] = useState([]);  
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState(null);
    const user = useSelector(state => state.user);
    const navigation = useNavigation();
    const dispatch = useDispatch()

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Filtros '
        });
        setIsLoading(true)
        if (filter) {
            fetchFunctionsByCinema();
        }
        else {
            // fetchFunctions();
            fetchCinemas();
            fetchMovies();
            // fetchGenre();
        }

    }, [filter]);

    const fetchFunctionsByCinema = async () => {

        try {
            const response = await axios.get(`https://backend-adi-uade.onrender.com/functions/cinema/${filter._id}`);
            if (response.data.data) {
                console.log('hola')
                const functionsArray = response.data.data.docs;
                setFunctionsAll(functionsArray)
                console.log(functionsArray)
                const filteredFunctions = functionsArray.reduce((accumulator, currentFunction) => {
                    const existingFunction = accumulator.find(item => item.movie._id === currentFunction.movie._id);
                    if (!existingFunction) {
                        accumulator.push(currentFunction);
                    }
                    return accumulator;
                }, []);
                setFunctions(filteredFunctions);
            }
            else {
                console.log('No functions')
                setFunctions(response.data.Functions)
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
            setGenre(moviesArray);
            setIsLoading(false);

        } catch (e) {
            ToastAndroid.show('Error al cargar las peliculas disponibles', ToastAndroid.SHORT);
            setIsLoading(false);
        }
    };
      
    const fetchCinemas = async () => {
        try {
            const response = await axios.get('https://backend-adi-uade.onrender.com/cinemas/');
            // console.log(response);
            const cinemasArray = response.data.Cinemas.docs;

            setCinemas(cinemasArray);
            setIsLoading(false);
            // console.log(cinemasArray);
        } catch (e) {
            ToastAndroid.show('Error al cargar los cines disponibles', ToastAndroid.SHORT);
            setIsLoading(false);
        }
    };

    const vacio = [{label:'soyvacio1', value:'soyvaluevacio1'},
    {label:'soyvacio2', value:'soyvaluevacio2'},
    {label:'soyvacio3', value:'soyvaluevacio3'}];

    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const isPortrait = screenWidth < screenHeight;
    const numColumns = isPortrait ? 2 : 3;


    const IMAGEN = require('../../../assets/logo.png')

    return (

    <SafeAreaView style={{ flex: 1 }}>
        <View>
            
            <DropdownUserFilter label='Seleccionar un cine' options={cinemas} selectedOption={filter} onSelectOption={setFilter} tipo={'cine'}/>
            <DropdownUserFilter options={movies} selectedOption={filter} onSelectOption={setFilter} tipo={'pelicula'}/>
            <DropdownUserFilter label='Seleccionar un genero' options={genre} selectedOption={filter} onSelectOption={setFilter} tipo={'genero'} />         
            <Rating
                type='custom'
                showRating
                ratingImage={IMAGEN}
                ratingColor='#E01D6F'
                ratingBackgroundColor='white'
                ratingCount={10}
                imageSize={33}
                startingValue={5}
                defaultRating={5}
                onFinishRating={this.ratingCompleted}
                style={{ paddingVertical: 10 }}
                />

            <DropdownUserFilter options={vacio} selectedOption={vacio.label} onSelectOption={vacio.label} tipo={'distancia'} />
        </View>
    </SafeAreaView>

    );
}


