import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHome from "../ui/screens/user/UHome";
import NavigatorConstant from "./NavigatorConstant";
import MovieDetail from "../ui/screens/user/UMovieDetail";
import SelectDateHour from "../ui/screens/user/USelectDateHour";
import SelectSeats from "../ui/screens/user/USelectSeats";
const Stack = createNativeStackNavigator()

export default function UserNavigator(props) {
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.USER_HOME} screenOptions={{ headerShown: true }}>
            <Stack.Screen name={'HOME_USUARIO'} component={UserHome} options={{ headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' }} />
            <Stack.Screen name={NavigatorConstant.USER.MOVIE} component={MovieDetail} options={{ headerShown: false }} />
            <Stack.Screen name={NavigatorConstant.USER.SELECT_PROPERTIES} component={SelectDateHour} options={{ headerShown: false }} />
            <Stack.Screen name={NavigatorConstant.USER.SELECT_SEATS} component={SelectSeats} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}