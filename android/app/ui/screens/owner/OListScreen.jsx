import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import ButtonOwnerMini from '../../components/ButtonOwnerMini';

export default function OListScreen({ isLoading, buttonAddTitle, screenName, total, cards, onPressButtonAdd }) {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        },
        lettertyperight: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
            marginRight: 28
        },
        lettertypeleft: {
            fontFamily: 'Poppins',
            color: 'white',
            fontSize: 22,
            marginLeft: 28
        },
        cardContainer: {
            marginVertical: 20,
            marginHorizontal: 16,
        },
        misCinesContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: 20,
            marginHorizontal: 16,
        },
    });

    return (
        <View style={styles.container}>
            <ButtonOwnerMini onPress={onPressButtonAdd} marginTop={10} title={buttonAddTitle} color='#E01D6F' />
            <View style={styles.misCinesContainer}>
                <Text style={styles.lettertypeleft}>{screenName}</Text>
                <Text style={styles.lettertyperight}>Total: {total}</Text>
            </View>
            {isLoading ? (
                <ActivityIndicator style={styles.loading} size="large" color="#FFFFFF" />
            ) : (
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={true}
                >
                    <View style={styles.cardContainer}>
                        {cards}
                    </View>
                </ScrollView>
            )}
        </View>
    );
}
