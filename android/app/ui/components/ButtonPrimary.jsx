import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ButtonPrimary(props) {

    const styles = StyleSheet.create({
        container: {
            marginHorizontal: 33,
            marginTop: props.butacas ? 210 : 40,
            height: 62,
        },
        button: {
            borderRadius: 20,
            backgroundColor: '#E01D6F',
            opacity: props.disabled ? 0.5 : 1,
            paddingVertical: 10,
        },
        text: {
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            fontWeight: 600,
            paddingVertical: 5
        }
    })
    return (
        <TouchableOpacity style={styles.container} onPress={props.onPress} disabled={props.disabled}>
            <View style={styles.button}>
                <Text style={styles.text}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
