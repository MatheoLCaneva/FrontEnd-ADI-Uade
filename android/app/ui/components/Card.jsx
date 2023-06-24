import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * Card para almacenar info con dos botones, uno de eliminar y otro de editar.
 *
 * @param {Object} props - Las props del componente.
 * @param {string} props.title - El texto principal.
 * @param {string} props.description - Texto bajo el titulo.
 * @param {string} props.rooms - Cant de salas.
 * @param {string} props.actives - Cant de salas activas.
 * @param {function} props.onPressBtnEdit - Función que controla el accionar al pulsar el boton de editar.
 * @param {function} props.onPressBtnDelete - Función que controla el accionar al pulsar el boton de eliminar.
 */

export default function Card(props) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>{props.title}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                    <Text style={styles.description}>Salas Totales: {props.rooms}</Text>
                    <Text style={styles.description}>Salas Activas: {props.actives}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={props.onPressBtnEdit} style={styles.button}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={props.onPressBtnDelete} style={styles.button}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    cardContent: {
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
