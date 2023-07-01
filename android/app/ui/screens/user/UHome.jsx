import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, FlatList, ToastAndroid, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import CardFunctionUser from '../../components/cards/CardFunctionUser';
import Dropdown from '../../components/Dropdown';

export default function UserHome() {
    const [functions, setFunctions] = useState([]);
    const [cinemas, setCinemas] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState(null);
    const user = useSelector(state => state.user);
    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerTitle: 'Hola ' + user.user.givenName
        });
        setIsLoading(true)
        if (filter) {
            fetchFunctionsByCinema();
        }
        else {
            fetchFunctions();
            fetchCinemas();
        }

    }, [filter]);

    const fetchFunctions = async () => {
        try {
            const response = await axios.get('https://backend-adi-uade.onrender.com/functions/');
            const functionsArray = response.data.Functions.docs;
            // Filtrar funciones por movie._id
            const filteredFunctions = functionsArray.reduce((accumulator, currentFunction) => {
                const existingFunction = accumulator.find(item => item.movie._id === currentFunction.movie._id);
                if (!existingFunction) {
                    accumulator.push(currentFunction);
                }
                return accumulator;
            }, []);

            setFunctions(filteredFunctions);
        } catch (e) {
            ToastAndroid.show('Error al cargar las funciones disponibles', ToastAndroid.SHORT);
            console.log(e)
            setIsLoading(false);
            return false
        }
    };

    const fetchFunctionsByCinema = async () => {

        try {
            const response = await axios.get(`https://backend-adi-uade.onrender.com/functions/cinema/${filter._id}`);
            if (response.data.data) {
                console.log('hola')
                const functionsArray = response.data.data.docs;
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

    const handleSelectMovie = (item) => {
        navigation.navigate('MOVIE_DETAIL')
    }

    const renderFunction = ({ item }) => {
        return <CardFunctionUser onPress={() => handleSelectMovie(item)} functions={item} />;
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

    if (isLoading) {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <ImageBackground
                    source={require('../../../assets/gradient.png')}
                    style={styles.container}
                >
                    {/* Puedes mostrar un indicador de carga aquí si lo deseas */}
                </ImageBackground>
            </SafeAreaView>
        );
    }

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
                    <Dropdown label='Seleccionar Cine' options={cinemas} selectedOption={filter} onSelectOption={setFilter} tipo={'cine'} />
                    <FlatList
                        data={functions}
                        renderItem={renderFunction}
                        keyExtractor={keyExtractor}
                        numColumns={numColumns}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}
