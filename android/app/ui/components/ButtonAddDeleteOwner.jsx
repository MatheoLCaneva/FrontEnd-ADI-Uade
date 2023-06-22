import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Boton mas chico que puede usarse para acciones de aceptar/cancelar.
 *
 * @param {Object} props - Las props del componente.
 * @param {string} props.title - El texto que muestra.
 * @param {function} props.onPress - Función que controla el accionar al pulsar.
 * @param {string} props.color - Color del botón.
 */

export default function ButtonAddDelete(props) {


    const styles = StyleSheet.create({
        container: {
            marginTop: 50,
            height: 55,
        },
        button: {
            borderRadius: 20,
            backgroundColor: props.color,
            paddingVertical: 10,
            width: 150
        },
        text: {
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            paddingVertical: 5
        }
    })


    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

