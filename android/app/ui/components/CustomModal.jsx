import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TextInput,
    TouchableOpacity,
    Image,
} from 'react-native';

export default function CustomModal({
    text = 'NO TEXT',
    inputPlaceholder = 'NO PLACEHOLDER',
    primaryTitle = 'NO TITLE',
    secondaryTitle = 'NO TITLE',
    onChangeText = () => console.error('No existe función para onChangeText'),
    onPress = (result) => console.error('No existe función para onPress'),
}) {
    const styles = StyleSheet.create({
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
        primaryButton: {
            backgroundColor: '#E01D6F',
        },
        secondaryButton: {
            backgroundColor: '#F0508C',
        },
        smallButton: {
            width: 140,
        },
        bigButton: {
            padding: 80,
            paddingVertical: 5,
        },
        textStyle: {
            fontSize: 18,
            textAlign: 'center',
            color: 'white',
            fontWeight: 600,
            paddingVertical: 5,
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
        modalBackground: {
            ...StyleSheet.absoluteFill,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo oscuro
        },
        buttonsView: {
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
        },
    });

    const onPressPrimary = () => {
        onPress(true);
    }

    const onPressSecondary = () => {
        onPress(false);
    }

    return (
        <View style={styles.modalBackground}>
            <Modal animationType="popup" transparent={true} visible={true}>
                <View>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            {text}
                        </Text>
                        {inputPlaceholder !== 'NO PLACEHOLDER' && (
                            <TextInput
                                style={styles.input}
                                onChangeText={onChangeText}
                                placeholder="Ingrese el código"
                                textAlign="center"
                            />
                        )}
                        {secondaryTitle === 'NO TITLE' ? (
                            <TouchableOpacity
                                onPress={onPressPrimary}
                                style={[styles.button, styles.bigButton, styles.primaryButton]}>
                                <Text style={styles.textStyle}>{primaryTitle}</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.buttonsView}>
                                <TouchableOpacity
                                    onPress={onPressPrimary}
                                    style={[styles.button, styles.smallButton, styles.primaryButton]}>
                                    <Text style={styles.textStyle}>{primaryTitle}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={onPressSecondary}
                                    style={[styles.button, styles.smallButton, styles.secondaryButton]}>
                                    <Text style={styles.textStyle}>{secondaryTitle}</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                </View>
            </Modal>
        </View>
    );
}
