import React from "react";
import { Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";

const AddressItems = ({ items, onSelectItemsHandler }) => {

    const styles = StyleSheet.create({
        lista: {
            backgroundColor: 'white',
            marginHorizontal: 30,
            marginTop: 5
            
        },
        text: {
            color: 'black',
            marginVertical: 3,
            padding: 10,
            borderBottomColor: 'black',
            borderBottomWidth: 1
        }
    })
    return (
        <FlatList
        style={styles.lista}
            className="bg-white mx-2 h-400"
            data={items}
            keyExtractor={(item) => item?.place_id || item?.properties?.place_id}
            renderItem={({ item }) => (
                <TouchableOpacity
                    className="border-b border-b-gray-300"
                    onPress={() => onSelectItemsHandler(item)}
                >
                    <Text style={styles.text} className="text-lg text-left mb-1 pl-2 py-2">
                        {item?.formatted || item?.properties?.formatted}
                    </Text>
                </TouchableOpacity>
            )}
        />
    );
};

export default AddressItems;