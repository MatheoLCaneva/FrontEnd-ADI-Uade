import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
/**
 * 
 * @param {Object} reserve - Nombre del cine.
 * @param {Function} onPress - Funcion al apretar
 * @returns 
 */
export default function CardBooking(props) {
    const reserve = props.reserve

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={props.onPress} style={styles.card}>
                <View>
                    <Text style={styles.title} >{reserve.movie.title}</Text>
                    <Text style={styles.description} >Cine: {reserve.cinema.name}</Text>
                    <Text style={styles.description} >Sala: {reserve.room.name}</Text>
                    <Text style={styles.description} >Cantidad de asientos: {reserve.seats.length}</Text>
                    <Text style={styles.description} >Fecha: {reserve.date}</Text>
                    <Text style={styles.description} >Hora: {reserve.hour}</Text>
                    <Text style={styles.description} >Estado: {reserve.status ? 'Completada' : 'Reservada'}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );
    ;
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
        marginHorizontal: 16,
    },
    card: {
        backgroundColor: '#E01D6F',
        borderRadius: 8,
        padding: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
        flex: 1,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white',
    },
    description: {
        fontSize: 14,
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 16,
    },
    button: {
        width: 80,
        height: 40,
        backgroundColor: '#E01D6F',
        borderRadius: 4,
        marginBottom: 8,
    },
    buttonText: {
        fontSize: 14,
        color: 'white',
        textAlign: 'center',
        lineHeight: 40,
    },
});
