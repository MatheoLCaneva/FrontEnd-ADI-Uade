import React, { Component,useState} from 'react';

import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CheckBox from 'expo-checkbox';



export default function CheckButton(props) {
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    return (
        <View style={styles.checkboxContainer}>
            <CheckBox
                disabled={false}
                value={toggleCheckBox}
                onValueChange={(newValue) => setToggleCheckBox(newValue)}               
            />
            <Text style={styles.text}>  Recuerdame</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    checkboxContainer: {
      flexDirection: 'row',
      marginBottom: 20,
    },
    checkbox: {
      alignSelf: 'center',
    },
    label: {
      margin: 8,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: 'white',
        fontWeight: 600,
        paddingVertical: 5
    }
  })