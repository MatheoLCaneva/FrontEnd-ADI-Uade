import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerLogin from "../ui/screens/OwnerLogin";
import MainScreen from "../ui/screens/MainScreen";
import NavigatorConstant from "./NavigatorConstant";

const Stack = createNativeStackNavigator()

export default function LoginNavigator() {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{headerShown: true}}>
            <Stack.Screen name={'Bienvenido'} component={MainScreen} options={{headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}, headerTitleAlign: 'center'}} />
            <Stack.Screen name={NavigatorConstant.LOGIN_STACK.LOGIN} component={OwnerLogin} options={{headerTitle:'Ingresar como dueño',headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'bold'}, headerTitleAlign: 'center'}} />
        </Stack.Navigator>
    )
}