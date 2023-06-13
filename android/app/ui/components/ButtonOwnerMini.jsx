import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ButtonOwnerMini(props) {
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
        marginHorizontal: 90,
        marginTop: 50,
        height: 55,
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
        paddingVertical: 5
    }
})