import React from 'react';
import { View, StyleSheet } from 'react-native';
import ButtonAddDelete from './ButtonAddDeleteOwner';

export default function DualButtonFooter({
    primaryTitle = 'NO TITLE',
    secondaryTitle = 'NO TITLE',
    onPressPrimary = () => console.error('No existe función para onPressPrimary'),
    onPressSecondary = () =>
        console.error('No existe función para onPressSecondary'),
}) {
    const styles = StyleSheet.create({
        buttons: {
            flex: 1,
            flexDirection: 'row-reverse',
            justifyContent: 'space-evenly',
        },
    });

    return (
        <View style={styles.buttons}>
            <ButtonAddDelete
                title={primaryTitle}
                color="#E01D6F"
                onPress={onPressPrimary}
            />
            <ButtonAddDelete
                title={secondaryTitle}
                color="#F0508C"
                onPress={onPressSecondary}
            />
        </View>
    );
}
