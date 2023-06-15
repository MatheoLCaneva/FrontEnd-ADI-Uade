import React, { Component,useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';
import ButtonPrimary from './ButtonPrimary';

export default function Popup(props, navigation) {
    const [modalVisible, setModalVisible] = useState(false);

    // const handlePressSendRecoveryPass = () => {
    //   navigation.navigate('CONFIRM_RECOVERY')
    // };


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
            <Text style={styles.modalText}>SOY POPUP DOS OPCIONES
            </Text>

            <View style={{  flexDirection: "row" , justifyContent: 'space-between' }}>
                    <View >
                        <Pressable
                          style={[styles.button, styles.buttonCloseSecundary]}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textStyle}>Cerrar modal2</Text>
                        </Pressable>
                    </View>
                    <View >
                      <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textStyle}>Cerrar modal</Text>
                      </Pressable> 
                    </View>

            </View>

          </View>
        </View>
      </Modal>
      <Pressable
        style={styles.button}
        marginTop={100} 
        onPress={() => setModalVisible(true)}>
          <Text style={styles.textStyle}>SOY POPUP DOS OPCIONES</Text>
      </Pressable>
      {/* <ButtonPrimary onPress={() => setModalVisible(true)} title='Enviar correo de recuperación' /> */}
    </View>
    )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalView: {
    margin: 10,
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
    marginTop:250,
  },
  buttonCloseSecundary:{
    padding: 5,   
    borderRadius: 5,
    backgroundColor: '#F0508C',
    paddingVertical: 5,  
  },
  button: {
    borderRadius: 20,
    backgroundColor: '#E01D6F',
    paddingVertical: 10,
    margin:15,
    marginTop: 5,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    padding: 5,   
    borderRadius: 5,
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
});