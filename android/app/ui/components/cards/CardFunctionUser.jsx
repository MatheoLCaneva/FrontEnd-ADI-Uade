import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

export default function CardFunctionUser({ functions, onPress }) {

    return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <Image style={styles.image} resizeMode="contain" source={{ uri: functions.movie.image }} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{functions.movie.title}</Text>
      </View>
      {/* Agrega más detalles o información de la función si es necesario */}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 0.5,
    margin: 8,
    // backgroundColor: 'lightgray',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  image: {
    width: '150%',
    aspectRatio: 1,
    marginBottom: 8,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
});
