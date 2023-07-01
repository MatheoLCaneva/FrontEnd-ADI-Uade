import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHome from "../ui/screens/user/UHome";
import NavigatorConstant from "./NavigatorConstant";
import MovieDetail from "../ui/screens/user/UMovieDetail";
import { TouchableOpacity, Text, Image } from 'react-native'
import { useNavigation } from "@react-navigation/native";
import { Svg } from "react-native-svg";
const Stack = createNativeStackNavigator()

export default function UserNavigator(props) {
    const navigation = useNavigation()
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: true }}>
            <Stack.Screen name={'HOME_USUARIO'} component={UserHome} options={{ headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' }} />
            <Stack.Screen name={NavigatorConstant.USER.MOVIE} component={MovieDetail} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}   