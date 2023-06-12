import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerLogin from "../ui/screens/OwnerLogin";
import NavigatorConstant from "./NavigatorConstant";
import PasswordReset from "../ui/screens/PasswordReset";
import ConfirmRecovCode from "../ui/screens/ConfirmRecovCode";
import LoginNavigator from "./LoginNavigator";
import Register from "../ui/screens/Register";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator()

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.LoginStackNavigator} screenOptions={{headerShown: false}} headerMode='none'>
                <Stack.Screen name={NavigatorConstant.NAVIGATOR.LOGIN} component={LoginNavigator} />
                <Stack.Screen name={NavigatorConstant.LOGIN_STACK.LOGIN} component={OwnerLogin} />
                <Stack.Screen name={NavigatorConstant.LOGIN_STACK.PASSWORD_RECOVERY} component={PasswordReset} />
                <Stack.Screen name={NavigatorConstant.REGISTER.REGISTER} component={Register} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}