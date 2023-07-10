import React from "react";
import { View, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const AddressInput = ({
    enterdText,
    placeHolderText,
    onChangeAddressHandler,
}) => {


    const styles = StyleSheet.create({
        input: {
            backgroundColor: 'white',
            borderRadius: 20,
            marginTop: 21,
            marginHorizontal: 32,
            paddingLeft: 20,
            color: 'black',
            opacity: 1,
            fontSize: 16, // Ajusta el tamaño de fuente según sea necesario
        },
    });
    return (
        <View className="relative">
            <TextInput style={styles.input}
                className="bg-gray-200 py-1 text-left px-3 ml-2 rounded text-base border-b-0"
                placeholder={placeHolderText}
                placeholderTextColor="#590B2C"
                value={enterdText}
                onChangeText={onChangeAddressHandler}
            />
        </View>
    );
};

export default AddressInput;