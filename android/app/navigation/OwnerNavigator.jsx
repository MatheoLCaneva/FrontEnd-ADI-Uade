import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ONavigator from "./ONavigator";
import NavigatorConstant from "./NavigatorConstant";
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';


const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator();

function Logout(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem label="Logout" onPress={() => console.log("LOGOUT")} />
        </DrawerContentScrollView>
    );
}

export default function OwnerNavigator(props) {
    const ownerScreen = useSelector(state => state.owner.screen);

    const baseOptions = {        
        headerStyle: { backgroundColor: '#E01D6F' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'normal' },
        headerTitleAlign: 'center'
    };

    console.log("🚀 ~ file: OwnerNavigator.jsx:37 ~ OwnerNavigator ~ ownerScreen:", ownerScreen)

    return (
        <Drawer.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.OWNER_DRAWER} screenOptions={{ ...baseOptions, headerShown: ownerScreen === NavigatorConstant.OWNER.OWNER_HOME, headerMode: "screen" }}
            drawerContent={(props) => <Logout {...props} />}>
            <Drawer.Screen name={NavigatorConstant.OWNER.OWNER_NAVIGATOR} component={ONavigator} options={{ headerBackVisible: false, headerLeft: null }} />
        </Drawer.Navigator>
    )
}