import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

/**
 * Card para almacenar info con dos botones, uno de eliminar y otro de editar.
 *
 * @param {String} title El texto principal.
 * @param {Array} items - Todos los renglones de texto que debe tener la card.
 * @param {Function} onPressBtnDelete - Función que controla el accionar al pulsar el boton de eliminar.
 * @param {Function} onPressBtnEdit - Función que controla el accionar al pulsar el boton de editar.
 * @param {Boolean} showSideButtons - Determina si se muestran o no los botones de Editar y Eliminar.
 */

export default Card = ({
    title = '',
    items = [],
    onPressBtnDelete = () => console.error('No existe función para onPressBtnDelete'),
    onPressBtnEdit = () => console.error('No existe función para onPressBtnEdit'),
    showSideButtons = false,
}) => {
    const listItems = items.map(item => {
        return (
            <Text style={styles.description}>
                {item.description ? item.description + ': ' : ''}
                {item.value}
            </Text>
        );
    });

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View style={styles.cardContent}>
                    <Text style={styles.title}>{title}</Text>
                    {listItems}
                </View>
            </View>
            {showSideButtons && (<View style={styles.buttonContainer}>
                <TouchableOpacity onPress={onPressBtnEdit} style={styles.button}>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressBtnDelete} style={styles.button}>
                    <Text style={styles.buttonText}>Eliminar</Text>
                </TouchableOpacity>
            </View>)}
        </View>
    );
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
