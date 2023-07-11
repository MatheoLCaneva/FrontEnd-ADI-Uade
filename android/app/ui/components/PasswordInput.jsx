import React, { useState }  from 'react';
import { StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, Image, View, TouchableOpacity } from 'react-native';

/**
 * Componente de entrada de texto.
 *
 * @param {Object} props - Las props del componente.
 * @param {string} props.placeholder - El texto de marcador de posición.
 * @param {function} props.onChangeText - La función de controlador de cambio de texto.
 * @param {boolean} props.secure - Indica si el campo de texto debe ser seguro.
 * @param {number} props.marginTop - El valor de margen superior.
 */
export default function Input(props, editable = true) {
    const [secure, setSecure] = useState(true);

    const handleScreenTouch = () => {
        Keyboard.dismiss();
    };

    const styles = StyleSheet.create({
        input: {
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: props.marginTop,
            marginLeft: 32,
            marginRight: 32,
            paddingLeft: 20,
            opacity: props.editable ? 1 : 0.7,
            fontSize: props.small ? 14 : 16, // Ajusta el tamaño de fuente según sea necesario
            paddingHorizontal: props.small ? 30 : 20, // Ajusta el padding horizontal según sea necesario
            flex: props.small ? 1 : null, // Ajusta el ancho de la entrada para ocupar todo el espacio disponible solo si es small
            color: 'black',
        },
        icon: {
            position: 'absolute',
            top: 12,
            right: 20,
        },
        textInput: {
            marginRight: 30,
        }
    });

    const changeSecure = () => {
        setSecure(!secure);
    }

    return (
        <TouchableWithoutFeedback onPress={handleScreenTouch}>
            <View style={styles.input}>
                <TouchableOpacity style={styles.icon} onPress={changeSecure}>
                    <Image source={require('../../assets/icons/search_black.png')} size={20} />
                </TouchableOpacity>
                <TextInput
                    style={styles.textInput}
                    placeholder={props.placeholder}
                    placeholderTextColor="#590B2C"
                    onChangeText={props.onChangeText}
                    secureTextEntry={secure}
                    editable={props.editable !== undefined ? props.editable : true}
                    value={props.value}
                />
            </View>
        </TouchableWithoutFeedback>
    );
}
