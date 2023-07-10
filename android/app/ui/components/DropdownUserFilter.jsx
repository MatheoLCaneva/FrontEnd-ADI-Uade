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
export default function DropdownUserFilter(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const { label, options, onSelectOption, aEditar, tipo } = props;
    const [optionSelected, setSelectedOption] = useState('');
    const [filters, setFilters] = useState({})
    // const [setTipo] = useState('pelicula');
    // const [optionSelected, setOptionSelected] = useState('');

    const handleSelectOption = (option) => {
        setModalVisible(false)
        onSelectOption(option)
        setSelectedOption(option)
    };
    const styles = StyleSheet.create({
        container: {
            marginVertical: 10,
            marginHorizontal: 32
        },
        label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginBottom: 5,
            color: 'black'
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
            color: 'black',
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
            color: 'black',
        },
    });



    const getText = () => {
        switch (tipo) {
            case 'cine':
                return optionSelected ? optionSelected.name : 'Selecciona un cine';
            case 'pelicula':
                return optionSelected ? optionSelected.title : 'Selecciona una película';
            case 'genero':
                return optionSelected ? optionSelected : 'Selecciona un genero';
            case 'calificacion':
                return optionSelected ? optionSelected.rate : 'Selecciona una calificación';
            case 'distancia':
                return optionSelected ? optionSelected : 'Selecciona una distancia';
            default:
                return '';
        }
    };
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton} disabled={props.disabled}>
                <Text style={styles.dropdownButtonText}>
                    {/* {tipo !== 'cine' ? optionSelected ? optionSelected.title : 'Selecciona una pelicula' : optionSelected ? optionSelected.name : 'Selecciona un cine'} */}
                    {getText()}
                </Text>

            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={options}
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity key={index} onPress={() => handleSelectOption(item)} style={styles.optionButton}>
                                <Text key={index} style={styles.optionText}>
                                    {(tipo !== "genero") ? tipo == 'cine' ? item.name : tipo == 'pelicula' ? item.title : tipo == 'distancia' ? item : null : item}
                                </Text>
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


