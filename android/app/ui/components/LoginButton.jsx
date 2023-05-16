import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LoginButton(props) {
    return (
        <TouchableOpacity style={styles.container}>
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
        marginHorizontal: 33,
        marginTop: 50,
        height: 62
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
        fontWeight: 600,
    }
})