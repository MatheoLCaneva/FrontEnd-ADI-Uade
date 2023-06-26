import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OwnerHome from "../ui/screens/owner/OHome";
import ONavigator from "./ONavigator";
import CreateCinema from "../ui/screens/owner/OCreateCinema";
import EditCinema from "../ui/screens/owner/OEditCinema";
import RoomsHome from "../ui/screens/owner/ORooms";
import CreateRoom from "../ui/screens/owner/OCreateRoom";
import EditRoom from "../ui/screens/owner/OEditRoom";
import FunctionsHome from "../ui/screens/owner/OFunctions";
import CreateFunction from "../ui/screens/owner/OCreateFunction";
import EditFunction from "../ui/screens/owner/OEditFunction";
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

    console.log(ownerScreen);

    return (
        <Drawer.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.START} screenOptions={{ headerShown: ownerScreen !== "OWNER_HOME", headerMode: "screen" }}
            drawerContent={(props) => <Logout {...props} />}>
            <Drawer.Screen name={"NavigatorConstant.OWNER.OWNER_HOME"} component={ONavigator} options={{ headerBackVisible: false, headerLeft: null }} />
        </Drawer.Navigator>
    )
}