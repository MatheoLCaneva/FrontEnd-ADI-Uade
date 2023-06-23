import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerHome from "../ui/screens/OHome";
import CreateCinema from "../ui/screens/OCreateCinema";
import EditCinema from "../ui/screens/OEditCinema";
import NavigatorConstant from "./NavigatorConstant";

const Stack = createNativeStackNavigator()

export default function OwnerNavigator(props) {

    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: true }}>
            <Stack.Screen name={NavigatorConstant.OWNER.OWNER_HOME} component={OwnerHome} options={{ headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center', headerBackVisible: false, headerLeft: null }} />
            <Stack.Screen name={NavigatorConstant.OWNER.CREATE_CINEMA} component={CreateCinema} options={{ headerTitle: 'Agregar Cine', headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' }} />
            <Stack.Screen name={NavigatorConstant.OWNER.EDIT_CINEMA} component={EditCinema} options={{ headerTitle: 'Editar Cine', headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' }} />
        </Stack.Navigator>
    )
}