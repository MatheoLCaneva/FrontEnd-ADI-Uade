import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ButtonOwnerPrimary(props) {
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress}>
            <View style={styles.button}>
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 30,
        marginTop: 90,
        height: 50,
        width: 120,
    },  
    button: {
        borderRadius: 20,
        backgroundColor: '#E01D6F',
        paddingVertical: 10,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        paddingVertical: 5,
    }
})