import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonAddDelete from './ButtonAddDeleteOwner';

export default function DualButtonFooter({
    primaryTitle = 'NO TITLE',
    secondaryTitle = 'NO TITLE',
    onPressPrimary = () => console.error('No existe función para onPressPrimary'),
    onPressSecondary = () =>
        console.error('No existe función para onPressSecondary'),
    cine = false,
    disablePrimary = false,
}) {
    const styles = StyleSheet.create({
        buttons: {
            flex: 0.5,
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
            marginTop: cine ? 100 : 0
        },
    });

    return (
        <View style={styles.buttons}>
            <ButtonAddDelete
                title={primaryTitle}
                color="#E01D6F"
                onPress={onPressPrimary}
                disablePrimary={disablePrimary}
            />
            <ButtonAddDelete
                title={secondaryTitle}
                color="#F0508C"
                onPress={onPressSecondary}
            />
        </View>
    );
}
