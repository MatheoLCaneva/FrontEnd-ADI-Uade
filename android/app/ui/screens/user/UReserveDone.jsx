import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ImageBackground } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import DualButtonFooter from '../../components/DualButtonFooter';
import { useNavigation } from '@react-navigation/native';
import NavigatorConstant from '../../../navigation/NavigatorConstant';
import { resetClientState } from '../../../redux/store';

export default function ReserveDone() {
    const func = useSelector(state => state.client.functionReserved)
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const logo = require('../../../assets/logo.png')

    const handleGoBack = () => {
        navigation.replace('HOME_USUARIO')
        console.log('ME VOY')
        dispatch(resetClientState)
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
        sutitle: {
            fontSize: 20,
            marginHorizontal: 15,
            marginTop: 20,
            color: 'white',
            fontWeight: '600',
        },
        text: {
            color: 'white',
            fontSize: 18,
            marginTop: 27,
            fontWeight: '600',
            marginHorizontal: 25
        },
        dateHour: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: 5
        },
        seats: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            flexGrow: 0.80
        },
        price: {
            marginBottom: 40
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
                <DualButtonFooter onPressPrimary={handleGoBack} primaryTitle='Volver' secondaryTitle='Mis Reservas'/>
            </ImageBackground>
        </SafeAreaView>
    );
}