import React, { Component,useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

export default function Popup(props) {
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <View style={styles.centeredView}>
      <Modal
        animationType="popup"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Enviamos un código de recuperación
            a su correo electrónico registrado</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Continuar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
    </View>
    )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#41041E',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#E01D6F',
    paddingVertical: 10,
},
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    padding: 35,   
    borderRadius: 20,
    backgroundColor: '#E01D6F',
    paddingVertical: 10,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: 600,
    paddingVertical: 5
  },
  modalText: {
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
});