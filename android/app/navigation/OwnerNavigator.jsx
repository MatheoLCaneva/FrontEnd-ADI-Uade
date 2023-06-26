import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerHome from "../ui/screens/owner/OHome";
import CreateCinema from "../ui/screens/owner/OCreateCinema";
import EditCinema from "../ui/screens/owner/OEditCinema";
import RoomsHome from "../ui/screens/owner/ORooms";
import CreateRoom from "../ui/screens/owner/OCreateRoom";
import EditRoom from "../ui/screens/owner/OEditRoom";
import FunctionsHome from "../ui/screens/owner/OFunctions";
import CreateFunction from "../ui/screens/owner/OCreateFunction";
import EditFunction from "../ui/screens/owner/OEditFunction";
import NavigatorConstant from "./NavigatorConstant";


const Stack = createNativeStackNavigator()
// const Drawer = createDrawer

export default function OwnerNavigator(props) {
    const baseOptions = { headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' };

    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: true }}>
            <Stack.Screen name={NavigatorConstant.OWNER.OWNER_HOME} component={OwnerHome} options={{ ...baseOptions, headerBackVisible: false, headerLeft: null }} />
            <Stack.Screen name={NavigatorConstant.OWNER.CREATE_CINEMA} component={CreateCinema} options={{ ...baseOptions, headerTitle: 'Agregar Cine' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.EDIT_CINEMA} component={EditCinema} options={{ ...baseOptions, headerTitle: 'Editar Cine' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.ROOMS_HOME} component={RoomsHome} options={{ ...baseOptions, headerLeft: null }} />
            <Stack.Screen name={NavigatorConstant.OWNER.CREATE_ROOM} component={CreateRoom} options={{ ...baseOptions, headerTitle: 'Agregar Sala' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.EDIT_ROOM} component={EditRoom} options={{ ...baseOptions, headerTitle: 'Editar Sala' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.FUNCTIONS_HOME} component={FunctionsHome} options={{ ...baseOptions, headerLeft: null }} />
            <Stack.Screen name={NavigatorConstant.OWNER.CREATE_FUNCTION} component={CreateFunction} options={{ ...baseOptions, headerTitle: 'Agregar Función' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.EDIT_FUNCTION} component={EditFunction} options={{ ...baseOptions, headerTitle: 'Editar Función' }} />
        </Stack.Navigator>
    )
}