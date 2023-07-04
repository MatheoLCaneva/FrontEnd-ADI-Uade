import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ButtonAddDelete from '../../components/ButtonAddDeleteOwner';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import BackArrow from '../../components/BackArrow';

export default function MovieDetail() {
    const navigation = useNavigation()
    const movie = useSelector(state => state.client.movie)

    const handleGoBack = () => {
        navigation.goBack()
    }
    const handleSchedule = () => {
        navigation.navigate(NavigatorConstant.USER.SELECT_PROPERTIES)
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 21,
            marginTop: 18
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 14,
            letterSpacing: 2,
            textAlign: 'center'
        },
        descContainer: {
            display: 'flex',
            flexDirection: 'row',
            marginTop: 44,
        },
        image: {
            width: '50%', // Reducir el ancho de la imagen para dar más espacio al texto
            aspectRatio: 1,
            marginBottom: 8,
        },
        descMovie: {
            color: 'white',
            flex: 1, // Añadir esta línea para que el texto ocupe el espacio disponible
            marginLeft: 8, // Añadir un margen izquierdo para separar el texto de la imagen
            marginBottom: 29
        },
        text: {
            color: 'white',
            marginBottom: 6, // Añadir un margen izquierdo para separar el texto de la imagen
            marginLeft: 26
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between'
        }
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <BackArrow onPress={handleGoBack} />
                <Text style={styles.title}>{movie.title.toUpperCase()}</Text>
                <View style={styles.descContainer}>
                    <Image style={styles.image} resizeMode="contain" source={{ uri: movie.image }} />
                    <Text style={styles.descMovie}>{movie.synopsis}</Text>
                </View>
                <Text style={styles.text}>Duracion: </Text>
                <Text style={styles.text}>Género: {movie.genre.join(", ")}</Text>
                <Text style={styles.text}>Fecha Lanzamiento: {movie.releaseDate}</Text>

                <View style={styles.buttonContainer}>
                    <ButtonAddDelete
                        title={'Compartir'}
                        color="#E01D6F"
                        onPress={handleSchedule}
                    />
                    <ButtonAddDelete
                        title={'Reservar'}
                        color="#F0508C"
                        onPress={handleSchedule}
                    />
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}