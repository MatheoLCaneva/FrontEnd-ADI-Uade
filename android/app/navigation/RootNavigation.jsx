import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerLogin from "../ui/screens/LOwnerLogin";
import NavigatorConstant from "./NavigatorConstant";
import PasswordReset from "../ui/screens/LPasswordReset";
import ConfirmRecovCode from "../ui/screens/LConfirmRecovCode";
import LoginNavigator from "./LoginNavigator";
import NewPw from "../ui/screens/LNewPw";
import Register from "../ui/screens/LRegister";
import ConfirmNewUserCode from "../ui/screens/LConfirmNewUserCode";
import OwnerHome from "../ui/screens/OHome";
import OwnerAddCine from "../ui/screens/OAddCine";
import OwnerModifyCine from "../ui/screens/OModifyCine"
import OwnerRooms from "../ui/screens/ORooms";
import OwnerAddRoom from "../ui/screens/OAddRoom";
import { NavigationContainer } from "@react-navigation/native";


const Stack = createNativeStackNavigator()

export default function RootNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.LoginStackNavigator} screenOptions={{headerShown: false}} headerMode='none'>
                <Stack.Screen name={NavigatorConstant.NAVIGATOR.LOGIN} component={LoginNavigator} />
                <Stack.Screen name={NavigatorConstant.LOGIN_STACK.LOGIN} component={OwnerLogin} />
                <Stack.Screen name={NavigatorConstant.LOGIN_STACK.PASSWORD_RECOVERY} component={PasswordReset} />
                <Stack.Screen name={NavigatorConstant.LOGIN_STACK.CONFIRM_RECOVERY} component={ConfirmRecovCode} />
                <Stack.Screen name={NavigatorConstant.LOGIN_STACK.NEW_PASSWORD} component={NewPw} />
                <Stack.Screen name={NavigatorConstant.REGISTER.REGISTER} component={Register} />
                <Stack.Screen name={NavigatorConstant.REGISTER.CONFIRM_NEW_USR_CODE} component={ConfirmNewUserCode} />
                <Stack.Screen name={NavigatorConstant.OWNER.OWNER_HOME} component={OwnerHome} />
                <Stack.Screen name={NavigatorConstant.OWNER.OWNER_ADD_CINE} component={OwnerAddCine} />
                <Stack.Screen name={NavigatorConstant.OWNER.OWNER_MODIFY_CINE} component={OwnerModifyCine} />
                <Stack.Screen name={NavigatorConstant.OWNER.OWNER_ROOMS} component={OwnerRooms} />
                <Stack.Screen name={NavigatorConstant.OWNER.OWNER_ADD_ROOM} component={OwnerAddRoom} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}