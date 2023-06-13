import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerLogin from "../ui/screens/OwnerLogin";
import MainScreen from "../ui/screens/MainScreen";
import PasswordReset from "../ui/screens/PasswordReset";
import ConfirmRecovCode from "../ui/screens/ConfirmRecovCode";
import NewPw from "../ui/screens/NewPw";
import Register from "../ui/screens/Register";
import ConfirmNewUserCode from "../ui/screens/ConfirmNewUserCode";
import NavigatorConstant from "./NavigatorConstant";

const Stack = createNativeStackNavigator()

export default function LoginNavigator() {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{headerShown: true}}>
            <Stack.Screen name={'Bienvenido'} component={MainScreen} options={{headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'normal'}, headerTitleAlign: 'center'}} />
            <Stack.Screen name={NavigatorConstant.LOGIN_STACK.LOGIN} component={OwnerLogin} options={{headerTitle:'Ingresar como dueño',headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'normal'}, headerTitleAlign: 'center'}} />
            <Stack.Screen name={NavigatorConstant.LOGIN_STACK.PASSWORD_RECOVERY} component={PasswordReset} options={{headerTitle:'Reestablecer contraseña',headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'normal'}, headerTitleAlign: 'center'}} />
            <Stack.Screen name={NavigatorConstant.LOGIN_STACK.CONFIRM_RECOVERY} component={ConfirmRecovCode} options={{headerTitle:'Reestablecer contraseña',headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'normal'}, headerTitleAlign: 'center'}} />
            <Stack.Screen name={NavigatorConstant.LOGIN_STACK.NEW_PASSWORD} component={NewPw} options={{headerTitle:'Reestablecer contraseña',headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'normal'}, headerTitleAlign: 'center'}} />
            <Stack.Screen name={NavigatorConstant.REGISTER.REGISTER} component={Register} options={{headerTitle:'Registro',headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'normal'}, headerTitleAlign: 'center'}} />
            <Stack.Screen name={NavigatorConstant.REGISTER.CONFIRM_NEW_USR_CODE} component={ConfirmNewUserCode} options={{headerTitle:'Confirmar usuario',headerStyle: {backgroundColor: '#E01D6F'}, headerTintColor: '#fff', headerTitleStyle: {fontWeight: 'normal'}, headerTitleAlign: 'center'}} />
        </Stack.Navigator>
    )
}