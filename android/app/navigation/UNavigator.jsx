import React from "react";
import UserHome from "../ui/screens/user/UHome";
import NavigatorConstant from "./NavigatorConstant";
import UserNavigator from "./UserNavigator";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function UserTabsNavigator(props) {
    return (
        <Tab.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.UsersTabsNavigator} screenOptions={{ headerShown: true }}>
            <Tab.Screen name={NavigatorConstant.USER_TABS.HOME} component={UserNavigator} options={{ headerShown: false }} />
            <Tab.Screen name={NavigatorConstant.USER_TABS.FILTERS} component={UserHome} options={{ headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' }} />
            <Tab.Screen name={NavigatorConstant.USER_TABS.BOOKINGS} component={UserHome} options={{ headerShown: false }} />
            <Tab.Screen name={NavigatorConstant.USER_TABS.PROFILE} component={UserHome} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}