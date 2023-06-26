import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';

/**
 * Componente Dropdown.
 *
 * @param {Object} props - Las props del componente.
 * @param {string} props.label - El texto de etiqueta del Dropdown.
 * @param {Array} props.options - Las opciones disponibles para elegir.
 * @param {function} props.onSelectOption - La función de controlador para cuando se selecciona una opción.
 */
export default function Dropdown(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const { label, options, onSelectOption, aEditar } = props;
    const [optionSelected, setSelectedOption] = useState('');

    const handleSelectOption = (option) => {
        setModalVisible(false)
        onSelectOption(option)
        setSelectedOption(option)
    };


    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label ? label : null} {aEditar ? 'Película actual: ' + aEditar : null}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>
                    {optionSelected ? optionSelected.title : 'Selecciona una pelicula'}
                </Text>

            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectOption(item)} style={styles.optionButton}>
                                <Text style={styles.optionText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                    />
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                        <Text style={styles.closeButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        marginHorizontal: 32
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
    dropdownButton: {
        backgroundColor: '#EFEFEF',
        paddingVertical: 10,
        paddingHorizontal: 12,
        borderRadius: 5,
    },
    dropdownButtonText: {
        fontSize: 16,
        color: '#555555',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#FFFFFF',
    },
    optionButton: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    optionText: {
        fontSize: 16,
        color: 'black'
    },
    closeButton: {
        backgroundColor: '#EFEFEF',
        paddingVertical: 16,
        alignItems: 'center',
    },
    closeButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555555',
    },
});
