import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from "./NavigatorConstant";
import LoginNavigator from "./LoginNavigator";
import OwnerNavigator from "./OwnerNavigator";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator()

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.LoginStackNavigator} screenOptions={{ headerShown: false }} headerMode='none'>
                <Stack.Screen name={NavigatorConstant.NAVIGATOR.LOGIN} component={LoginNavigator} />
                <Stack.Screen name={NavigatorConstant.OWNER.OWNER_HOME} component={OwnerNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}