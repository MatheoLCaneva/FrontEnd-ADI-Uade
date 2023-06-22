import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Card(props) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{props.title}</Text>
            <Text style={styles.description}>{props.description}</Text>
            <Text style={styles.description}>Salas Totales: {props.rooms}</Text>
            <Text style={styles.description}>Salas Activas: {props.actives}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#E01D6F',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 16,
        shadowColor: '#000000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
        color: 'white'
    },
    description: {
        fontSize: 14,
        color:'white'
    },
});