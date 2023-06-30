import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserHome from "../ui/screens/user/UHome";
import NavigatorConstant from "./NavigatorConstant";
import MovieDetail from "../ui/screens/user/UMovieDetail";
import {TouchableOpacity, Text} from 'react-native'
import { useNavigation } from "@react-navigation/native";
const Stack = createNativeStackNavigator()

export default function UserNavigator(props) {
    const navigation = useNavigation()
    return (
        <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: true }}>
            <Stack.Screen name={'HOME_USUARIO'} component={UserHome} options={{ headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' }} />
            <Stack.Screen
                name={NavigatorConstant.USER.MOVIE}
                component={MovieDetail}
                options={{
                    headerStyle: { backgroundColor: '#E01D6F' },
                    headerTintColor: '#fff',
                    headerTitle: '', // Vacío para ocultar el título
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{color: 'white', fontSize: 24}} >Volver</Text>
                        </TouchableOpacity>
                    ),
                    headerLeftContainerStyle: { paddingLeft: 16 },
                }}
            />

        </Stack.Navigator>
    )
}   