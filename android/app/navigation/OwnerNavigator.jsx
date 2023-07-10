import React from 'react';
import { Image } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ONavigator from './ONavigator';
import NavigatorConstant from './NavigatorConstant';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import UserProfile from '../ui/screens/user/UProfile';

const HOME_ICON = require('../assets/icons/home.png');

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const drawerStyles = {
    headerBackVisible: false,
    drawerActiveTintColor: '#fff',
    drawerActiveBackgroundColor: '#41041E',
    drawerInactiveTintColor: '#fff',
    drawerInactiveBackgroundColor: '#E01D6F',
    drawerStyle: {
        backgroundColor: '#E01D6F',
        width: 180,
    },
};

function Logout(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Log Out"
                inactiveTintColor={drawerStyles.drawerInactiveTintColor}
                onPress={() => console.log('LOGOUT')}
            />
        </DrawerContentScrollView>
    );
}

export default function OwnerNavigator(props) {
    const ownerScreen = useSelector(state => state.owner.screen);

    const headerOptions = {
        headerStyle: { backgroundColor: '#E01D6F' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'normal' },
        headerTitleAlign: 'center',
        headerMode: 'screen',
    };

    const iconsStyle = {
        resizeMode: 'contain',
        height: 20,
        width: 20,
    }

    return (
        <Drawer.Navigator
            initialRouteName={NavigatorConstant.NAVIGATOR.OWNER_DRAWER}
            screenOptions={{
                ...headerOptions,
                headerShown: ownerScreen === NavigatorConstant.OWNER.OWNER_HOME,
            }}
            drawerContent={props => <Logout {...props} />}>
            <Drawer.Screen
                name={NavigatorConstant.OWNER.OWNER_NAVIGATOR}
                component={ONavigator}
                options={{
                    ...drawerStyles,
                    drawerLabel: 'Home',
                    drawerIcon: () => (
                        <Image
                            source={HOME_ICON}
                            style={iconsStyle}
                        />
                    ),
                }}
            />
            <Drawer.Screen
                name={NavigatorConstant.OWNER.OWNER_PROFILE}
                component={UserProfile}
                options={{ 
                    ...drawerStyles, 
                    drawerLabel: 'Perfil',
                    drawerIcon: () => (
                        <Image
                            source={HOME_ICON}
                            style={iconsStyle}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
