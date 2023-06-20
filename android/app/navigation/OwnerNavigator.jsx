import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerHome from "../ui/screens/OHome";
import NavigatorConstant from "./NavigatorConstant";

const Stack = createNativeStackNavigator()

export default function OwnerNavigator() {

    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: true }}>
            <Stack.Screen name={NavigatorConstant.OWNER.OWNER_HOME} component={OwnerHome} options={{ headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center', headerBackVisible: false }} />
        </Stack.Navigator>
    )
}