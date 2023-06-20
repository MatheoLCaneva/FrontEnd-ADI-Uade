import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';


export default function Popup(props) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalClose = () => {
    setModalVisible(false)
  }

  return (
    <View>
      <Modal
        animationType="popup"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{props.text}</Text>
            <TextInput style={styles.input} placeholder='Ingrese el código' textAlign='center' />
            <Pressable
            onPress={handleModalClose}
              style={[styles.button, styles.buttonClose]}
            >
              <Text style={styles.textStyle}>{props.title}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {/* <Pressable
        style={styles.button}
        marginTop={100}
        onPress={() => setModalVisible(true)}>
      </Pressable> */}
      {/* <ButtonPrimary onPress={() => setModalVisible(true)} title='Enviar correo de recuperación' /> */}
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
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 250,
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#E01D6F',
    paddingVertical: 10,
    margin: 30,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    padding: 80,
    borderRadius: 20,
    backgroundColor: '#E01D6F',
    paddingVertical: 5,
  },
  textStyle: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontWeight: 600,
    paddingVertical: 5
  },
  modalText: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },

  input: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 32,
    paddingHorizontal: 50,
  },
});