import React from "react";
import UserHome from "../ui/screens/user/UHome";
import UFilters from "../ui/screens/user/UFilters";
import NavigatorConstant from "./NavigatorConstant";
import UserNavigator from "./UserNavigator";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from "../ui/screens/user/UProfile";
import BookingsNavigator from "./BookingsNavigator";

const Tab = createBottomTabNavigator();

export default function UserTabsNavigator(props) {
    return (
        <Tab.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.UsersTabsNavigator} screenOptions={{ headerShown: true }}>
            <Tab.Screen name={NavigatorConstant.USER_TABS.HOME} component={UserNavigator} options={{ headerShown: false }} />
            <Tab.Screen name={NavigatorConstant.USER_TABS.FILTERS} component={UFilters} options={{ headerStyle: { backgroundColor: '#E01D6F' }, headerTintColor: '#fff', headerTitleStyle: { fontWeight: 'normal' }, headerTitleAlign: 'center' }} />
            <Tab.Screen name={NavigatorConstant.USER_TABS.BOOKINGS} component={BookingsNavigator} options={{ headerShown: false }} />
            <Tab.Screen name={NavigatorConstant.USER_TABS.PROFILE} component={UserProfile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}