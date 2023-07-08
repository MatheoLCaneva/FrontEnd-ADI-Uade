import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

/**
 * Boton mas chico que puede usarse para acciones de aceptar/cancelar.
 *
 * @param {Object} props - Las props del componente.
 * @param {function} props.onPress - Función que controla el accionar al pulsar.
 * @param {boolean} props.disabled - Controla si puede editarse.
 *
 */

export default function ButtonSend(props) {


    const styles = StyleSheet.create({
        container: {
            marginTop: 17,
            width: 130,
            marginLeft: 13,
            height: 55,
            backgroundColor: '#E01D6F',
            opacity: props.disabled ? 0.5 : 1,
            borderRadius: 20
        },
        button: {
            borderRadius: 20,
            paddingVertical: 10,
        },
        text: {
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            paddingVertical: 5
        }
    })


    return (
        <TouchableOpacity disabled={props.disabled} style={styles.container} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>
                    Enviar
                </Text>
            </View>
        </TouchableOpacity>
    )
}

