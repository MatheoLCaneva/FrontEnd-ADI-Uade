import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from "./NavigatorConstant";

const Stack = createNativeStackNavigator()

export default function BookingsNavigator(props) {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: true }}>
        </Stack.Navigator>
    )
}