import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

export default function MovieDetail() {
    const navigation = useNavigation()
    const movie = useSelector(state => state.client.movie)
    console.log(movie)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 21,
            marginTop: 18
        },

        // Agrega aquí tus estilos personalizados
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image style={{ height: 20, width: 40 }} source={require('../../../assets/icons/arrowleft.png')} />
                </TouchableOpacity>
                <View>
                    <Text>{movie.movie.title}</Text>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
}