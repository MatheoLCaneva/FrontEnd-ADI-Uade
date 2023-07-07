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
    const { label, options, onSelectOption, aEditar, tipo } = props;
    const [optionSelected, setSelectedOption] = useState('');

    const handleSelectOption = (option) => {
        setModalVisible(false)
        onSelectOption(option)
        setSelectedOption(option)
    };

    const styles = StyleSheet.create({
        container: {
            marginVertical: tipo == 'cine' ? 0 : 10,
            marginHorizontal: tipo == 'cine' ? 0 : 32
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
            opacity: props.disabled ? 0.6 : 1
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



    return (
        <View style={styles.container}>
            <Text style={tipo == 'cine' ? null : styles.label}>{tipo == 'cine' ? null : label ? label : null} {aEditar ? 'Película actual: ' + aEditar : null}</Text>
            <TouchableOpacity disabled={props.disabled} onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>
                    {tipo !== 'cine' ? optionSelected ? optionSelected.title : 'Selecciona una pelicula' : optionSelected ? optionSelected.name ? optionSelected.name : optionSelected: 'Selecciona un cine'}
                </Text>

            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectOption(item)} style={styles.optionButton}>
                                <Text style={styles.optionText}>{tipo == 'cine' ? item.name ? item.name : item : item.title}</Text>
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
