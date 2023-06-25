import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerHome from "../ui/screens/owner/OHome";
import CreateCinema from "../ui/screens/owner/OCreateCinema";
import EditCinema from "../ui/screens/owner/OEditCinema";
import RoomsHome from "../ui/screens/owner/ORooms";
import CreateRoom from "../ui/screens/owner/ORooms";
import EditRoom from "../ui/screens/owner/ORooms";
import NavigatorConstant from "./NavigatorConstant";

const Stack = createNativeStackNavigator()

export default function OwnerNavigator(props) {
    const baseOptions = { headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' };

    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: true }}>
            <Stack.Screen name={NavigatorConstant.OWNER.OWNER_HOME} component={OwnerHome} options={{ ...baseOptions, headerBackVisible: false, headerLeft: null }} />
            <Stack.Screen name={NavigatorConstant.OWNER.CREATE_CINEMA} component={CreateCinema} options={{ ...baseOptions, headerTitle: 'Agregar Cine' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.EDIT_CINEMA} component={EditCinema} options={{ ...baseOptions, headerTitle: 'Editar Cine' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.ROOMS_HOME} component={RoomsHome} options={{ ...baseOptions, headerTitle: 'Mis Salas', headerBackVisible: false, headerLeft: null }} />
            <Stack.Screen name={NavigatorConstant.OWNER.CREATE_ROOM} component={CreateRoom} options={{ ...baseOptions, headerTitle: 'Agregar Sala' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.EDIT_ROOM} component={EditRoom} options={{ ...baseOptions, headerTitle: 'Editar Sala' }} />
        </Stack.Navigator>
    )
}