import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

/**
 * Componente de entrada de texto.
 *
 * @param {Object} props - Las props del componente.
 * @param {function} props.onChangeText - La función de controlador de cambio de texto.
 * @param {number} props.marginTop - El valor de margen superior.
 * @param {number} props.disabled - Si puede editarse.
 *
 */
export default function InputComment(props) {
    const styles = StyleSheet.create({
        input: {
            backgroundColor: '#E01D6F',
            marginTop: 17,
            marginHorizontal: 15,
            fontSize: props.small ? 14 : 16, // Ajusta el tamaño de fuente según sea necesario
            paddingHorizontal: props.small ? 30 : 20, // Ajusta el padding horizontal según sea necesario
            color: 'white'
        },

    });

    return (
        <TextInput
            style={styles.input}
            placeholderTextColor='white'
            onChangeText={props.onChangeText}
            cursorColor={'white'}
            multiline={true}
            placeholder={props.disabled ? 'Ya ha comentado esta película' : 'Escriba aquí su comentario'}
            editable={props.disabled == true ? false : true} 
        />
    );
}

