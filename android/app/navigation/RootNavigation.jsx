import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NavigatorConstant from "./NavigatorConstant";
import LoginNavigator from "./LoginNavigator";
import OwnerNavigator from "./OwnerNavigator";
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaView, ImageBackground, StyleSheet } from 'react-native';

const navTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
    },
};

const Stack = createNativeStackNavigator()

export default function RootNavigation() {
    const styles = StyleSheet.create({
        container: {
            flex: 1,
        }
    });

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground
                source={require('../assets/gradient.png')}
                style={styles.container}>
                <NavigationContainer theme={navTheme} >
                    <Stack.Navigator initialRouteName={NavigatorConstant.NAVIGATOR.LoginStackNavigator} screenOptions={{ headerShown: false }} headerMode='none'>
                        <Stack.Screen name={NavigatorConstant.NAVIGATOR.LOGIN} component={LoginNavigator} />
                        <Stack.Screen name={NavigatorConstant.OWNER.OWNER_HOME} component={OwnerNavigator} />
                    </Stack.Navigator>
                </NavigationContainer>
            </ImageBackground>
        </SafeAreaView>
    )
}