import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

export default function Input(props) {
    return (
        <TextInput style={styles.input} placeholder={props.placeholder} placeholderTextColor='#590B2C'/>
    )
}
const styles = StyleSheet.create({
    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        
    }
})