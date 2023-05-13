import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerLogin from "../ui/screens/OwnerLogin";
import MainScreen from "../ui/screens/MainScreen";
import NavigatorConstant from "./NavigatorConstant";

const Stack = createNativeStackNavigator()

export default function LoginNavigator() {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{headerShown: false}}>
            <Stack.Screen name={NavigatorConstant.LOGIN_STACK.MAIN} component={MainScreen}/>
            <Stack.Screen name={NavigatorConstant.LOGIN_STACK.LOGIN} component={OwnerLogin}/>
        </Stack.Navigator>
    )
}