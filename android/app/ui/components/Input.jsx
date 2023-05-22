import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Input(props) {

    const styles = StyleSheet.create({
        input: {
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: props.marginTop,
            marginHorizontal: 32,
            paddingLeft: 20
        }
    })

    return (
        <TextInput style={styles.input} placeholder={props.placeholder} placeholderTextColor='#590B2C' onChangeText={props.onChangeText} secureTextEntry={props.secure}/>
    )
}
