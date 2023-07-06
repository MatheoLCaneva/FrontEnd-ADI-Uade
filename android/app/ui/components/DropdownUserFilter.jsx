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
    // const [setTipo] = useState('pelicula');
    // const [optionSelected, setOptionSelected] = useState('');

    const handleSelectOption = (option) => {
        setModalVisible(false)
        onSelectOption(option)
        setSelectedOption(option)
    };


    const styles = StyleSheet.create({
        container: {
            marginVertical:  10,
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
            return optionSelected ?  optionSelected.name : 'Selecciona un cine';
          case 'pelicula':
            return optionSelected ? optionSelected.title : 'Selecciona una película';
          case 'genero':
            return optionSelected ? optionSelected.genre : 'Selecciona un genero';
          case 'calificacion':
            return optionSelected ? optionSelected.rate : 'Selecciona una calificación';
          case 'distancia':
            return optionSelected ? optionSelected.distance : 'Selecciona una distancia';
          default:
            return '';
        }
      };
    //   {getText()}
    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.dropdownButton}>
                <Text style={styles.dropdownButtonText}>
                    {/* {tipo !== 'cine' ? optionSelected ? optionSelected.title : 'Selecciona una pelicula' : optionSelected ? optionSelected.name : 'Selecciona un cine'} */}
                    {getText()}
                </Text>

            </TouchableOpacity>
            <Modal visible={modalVisible} animationType="slide" transparent={true}>
                <View style={styles.modalContainer}>
                    <FlatList
                        data={options}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleSelectOption(item)} style={styles.optionButton}>
                                <Text style={styles.optionText}>
                                    {(tipo !== "genero" ) ? Object.values(item)[1] : Object.values(item)[3]}
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


