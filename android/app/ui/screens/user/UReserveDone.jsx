import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import DualButtonFooter from '../../components/DualButtonFooter';
import { useNavigation, CommonActions } from '@react-navigation/native';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import { resetClientState } from '../../../redux/store';

export default function ReserveDone({ navigation }) {
    const func = useSelector(state => state.client.functionReserved)
    const dispatch = useDispatch()
    const logo = require('../../../assets/logo.png')

    const handleGoBack = () => {
        navigation.replace(NavigatorConstant.NAVIGATOR.USERS_TAB_HOME)
        dispatch(resetClientState)
    }

    const handleViewReserves = () => {        
        navigation.dispatch(
            CommonActions.reset({
                index: 0,
                routes: [{ name: NavigatorConstant.USER_TABS.BOOKINGS }]
            })
        );
    }

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginHorizontal: 21,
            marginTop: 18
        },
        principal: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 14,
            marginBottom: 40,
            letterSpacing: 2,
            textAlign: 'center'
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            color: 'white',
            marginTop: 14,
            letterSpacing: 2,
            textAlign: 'center'
        },
        code: {
            fontSize: 20,
            color: 'white',
            textAlign: 'center'
        },
        text: {
            color: 'white',
            fontSize: 18,
            marginTop: 27,
            fontWeight: '600',
            marginHorizontal: 25
        },
        qr: {
            // marginTop: 200
            alignSelf: 'center',
            marginTop: 30,
        }

        // Agrega aquí tus estilos personalizados
    });

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                source={require('../../../assets/gradient.png')}
                style={styles.container}
            >
                <Text style={styles.principal}> Gracias por su reserva</Text>
                <View>
                    <Text style={styles.title}> Su codigo de reserva es:</Text>
                    <Text style={styles.code}> {func._id}</Text>
                </View>
                <View style={styles.qr}>
                    <QRCode size={200} logo={logo} logoSize={20} value="dssas" />
                </View>
                {/* ...componentes */}
                <DualButtonFooter onPressPrimary={handleGoBack} primaryTitle='Volver' onPressSecondary={handleViewReserves}  secondaryTitle='Mis Reservas'/>
            </ImageBackground>
        </SafeAreaView>
    );
}