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
import { useSelector, useDispatch } from 'react-redux';
import UserProfile from '../ui/screens/user/UProfile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUser } from '../redux/store';

const HOME_ICON = require('../assets/icons/home.png');
const SETTINGS_ICON = require('../assets/icons/settings.png');
const LOGOUT_ICON = require('../assets/icons/logout.png');

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

const iconsStyle = {
    resizeMode: 'contain',
    height: 20,
    width: 20,
}

function Logout(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Log Out"
                inactiveTintColor={drawerStyles.drawerInactiveTintColor}
                onPress={props.onPress}
                icon={() => (
                    <Image
                        source={LOGOUT_ICON}
                        style={iconsStyle}
                    />
                )}
            />
        </DrawerContentScrollView>
    );
}

export default function OwnerNavigator({ navigation }) {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch();
    const cinema = useSelector(state => state.owner.cinema)
    const room = useSelector(state => state.owner.room)
    const ownerScreen = useSelector(state => state.owner.screen);

    const headerOptions = {
        headerStyle: { backgroundColor: '#E01D6F' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'normal' },
        headerTitleAlign: 'center',
        headerMode: 'screen',
    };

    const logout = () => {
        AsyncStorage.removeItem('Owner')
        navigation.replace(NavigatorConstant.NAVIGATOR.LOGIN);
        dispatch(setUser({}));
    };

    return (
        <Drawer.Navigator
            initialRouteName={NavigatorConstant.NAVIGATOR.OWNER_DRAWER}
            screenOptions={{
                ...headerOptions,
                // headerShown: ownerScreen === NavigatorConstant.OWNER.OWNER_HOME,
            }}
            drawerContent={props => <Logout {...props} onPress={logout} />}>
            <Drawer.Screen
                name={NavigatorConstant.OWNER.OWNER_NAVIGATOR}
                component={ONavigator}
                options={{
                    ...drawerStyles,
                    drawerLabel: 'Home',
                    headerTitle: ownerScreen == 'OWNER_HOME' ? `Hola ${user.name}` : ownerScreen == 'CREATE_CINEMA' ? 'Agregar Cine' : ownerScreen == 'EDIT_CINEMA' ? 'Editar Cine' : ownerScreen == 'ROOMS_HOME' ? `Salas de ${cinema.name}` : ownerScreen == 'CREATE_ROOM' ? 'Agregar Sala' : ownerScreen == 'EDIT_ROOM' ? 'Modificar Sala' : ownerScreen == 'FUNCTIONS_HOME' ? `Funciones de ${room.name}` : ownerScreen == 'CREATE_FUNCTION' ? 'Agregar Funcion' : ownerScreen == 'EDIT_FUNCTION' ? 'Editar Funcion' : null,
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
                            source={SETTINGS_ICON}
                            style={iconsStyle}
                        />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
}
