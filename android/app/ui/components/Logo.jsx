import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

/**
 * Logo de la empresa en formato grande.
 */
export default Logo = () => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={require('../../assets/logo.png')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 341, //Imagen original: 567 píxeles
        height: 160, //Imagen original: 266 píxeles
    },
});
