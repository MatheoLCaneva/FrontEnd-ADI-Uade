import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from "./NavigatorConstant";
import BookingsHome from "../ui/screens/user/UBookingsHome";
import BookingDetail from "../ui/screens/user/UBookingDetail";

const Stack = createNativeStackNavigator()

export default function BookingsNavigator(props) {

    const baseOptions = { /*headerShown: false,*/ headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' };

    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: true }}>
            <Stack.Screen name={NavigatorConstant.USER_BOOKINGS.HOME} component={BookingsHome} options={{...baseOptions, headerTitle: 'Reservas'}} />
            <Stack.Screen name={NavigatorConstant.USER_BOOKINGS.BOOKING} component={BookingDetail} options={{...baseOptions, headerTitle: 'Detalle de Reserva'}} />
        </Stack.Navigator>
    )
}