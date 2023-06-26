import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

/**
 * Componente de entrada de texto.
 *
 * @param {Object} props - Las props del componente.
 * @param {string} props.placeholder - El texto de marcador de posición.
 * @param {function} props.onChangeText - La función de controlador de cambio de texto.
 * @param {boolean} props.secure - Indica si el campo de texto debe ser seguro.
 * @param {number} props.marginTop - El valor de margen superior.
 */
export default function Input(props) {
    const styles = StyleSheet.create({
        input: {
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: props.marginTop,
            marginHorizontal: 32,
            paddingLeft: 20,
            fontSize: props.small ? 14 : 16, // Ajusta el tamaño de fuente según sea necesario
            paddingHorizontal: props.small ? 30 : 20, // Ajusta el padding horizontal según sea necesario
            flex: props.small ? 1 : null, // Ajusta el ancho de la entrada para ocupar todo el espacio disponible solo si es small
            color: 'black'
        },

    });

    return (
        <TextInput
            style={styles.input}
            placeholder={props.placeholder}
            placeholderTextColor='#590B2C'
            onChangeText={props.onChangeText}
            secureTextEntry={props.secure}
            editable={props.editable !== undefined ? props.editable : true} 
            value={props.value}
        />
    );
}

