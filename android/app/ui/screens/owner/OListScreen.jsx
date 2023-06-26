import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
import ButtonOwnerMini from '../../components/ButtonOwnerMini';
import CustomAlert from '../../components/CustomAlert';

/**
 *
 * @param {Boolean} isLoading Indica si se está mostrando el spinner de carga o no.
 * @param {String} buttonAddTitle Texto a mostrar en el botón "Agregar".
 * @param {String} screenName Texto a mostrar en el sector izquierdo de la pantalla.
 * @param {String} total Número que representa el total de cards.
 * @param {String} cards Cards a mostrar.
 * @param {Function} onPressButtonAdd Función que controla el accionar al pulsar el botón de agregar.
 * @returns
 */
export default function OListScreen({
    isLoading = false,
    isModalVisible = false,
    modalText = 'NO MODAL TEXT',
    onPressModal = () => console.error('No existe función para onPressModal'),
    buttonAddTitle = 'NO TITLE',
    screenName = "NO SCREEN NAME",
    total = "0",
    cards = "NO CARDS",
    onPressButtonAdd = () => console.error('No existe función para onPressButtonAdd'),
}) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        lettertyperight: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
            marginRight: 28,
        },
        lettertypeleft: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
            marginLeft: 28,
        },
        cardContainer: {
            marginVertical: 20,
            marginHorizontal: 16,
        },
        misCinesContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 20,
            marginHorizontal: 16,
        },
    });

    return (
        <View style={styles.container}>
            <ButtonOwnerMini
                onPress={onPressButtonAdd}
                marginTop={10}
                title={buttonAddTitle}
                color="#E01D6F"
            />
            <View style={styles.misCinesContainer}>
                <Text style={styles.lettertypeleft}>{screenName}</Text>
                <Text style={styles.lettertyperight}>Total: {total}</Text>
            </View>
            {isLoading ? (
                <ActivityIndicator
                    style={styles.loading}
                    size="large"
                    color="#FFFFFF"
                />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}>
                    <View style={styles.cardContainer}>{cards}</View>
                </ScrollView>
            )}
            {isModalVisible && <CustomAlert text={modalText} primaryTitle='Eliminar' secondaryTitle='Cancelar' onPress={onPressModal}/>}
        </View>
    );
}
