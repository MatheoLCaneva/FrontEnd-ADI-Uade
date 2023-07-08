import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ButtonAddDelete from '../../components/ButtonAddDeleteOwner';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import BackArrow from '../../components/BackArrow';
import axios from 'axios';
import LoadingIndicator from '../../components/LoadingIndicator';

export default function MovieDetail() {
    const [isLoading, setIsLoading] = useState(true);
    const [comments, setComments] = useState([])
    const navigation = useNavigation()
    const movie = useSelector(state => state.client.movie)
    const user = useSelector(state => state.user.user)


    const fetchComments = async () => {
        try {
            const response = await axios.get(`https://backend-adi-uade.onrender.com/comments/user/${user.email}/${movie._id}`)
            setComments(response.data.data.docs)
        } catch (e) {
            console.log(e)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        setIsLoading(true)
        fetchComments()

    }, [])

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
        },
        commentTitle: {
            fontSize: 20,
            marginHorizontal: 15,
            marginTop: 20,
            color: 'white',
            fontWeight: '600',
            textDecorationLine: 'underline'
        },
        commentContainer: {
            backgroundColor: '#E01D6F',
            height: 85,
            padding: 10,
            marginHorizontal: 5,
            borderBottomColor: 'black',
            borderBottomWidth: 1,
            borderRadius: 5

        },
        scroll: {
            flexGrow: 0.85,
            marginTop: 11
        },
        userComment: {
            fontSize: 18,
            color: 'white',
            fontWeight: '600'
        },
        commentText: {
            color: 'white',
            fontStyle: 'italic',
            fontSize: 13

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
                <Text style={styles.commentTitle}>Comentarios</Text>
                <ScrollView style={styles.scroll}>
                    {isLoading ? (<LoadingIndicator />) : (
                        comments.map((item, index) => (
                            <View style={styles.commentContainer} key={index}>
                                <Text style={styles.userComment}>{item.user.name}</Text>
                                <Text style={styles.commentText}>{item.comment}</Text>
                            </View>
                        ))
                    )
                    }
                </ScrollView>

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