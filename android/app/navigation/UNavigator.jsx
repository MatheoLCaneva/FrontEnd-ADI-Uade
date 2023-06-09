import React from 'react';
import { StyleSheet, AppRegistry, ScrollView, Image, Text, View } from 'react-native';
import UserHome from '../ui/screens/user/UHome';
import UFilters from '../ui/screens/user/UFilters';
import NavigatorConstant from './NavigatorConstant';
import UserNavigator from './UserNavigator';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserProfile from '../ui/screens/user/UProfile';
import BookingsNavigator from './BookingsNavigator';

const Tab = createBottomTabNavigator();

export default function UserTabsNavigator(props) {

  const styles = StyleSheet.create({
    icon: {
      marginTop: 15
    }
  })

  return (
    <Tab.Navigator
      initialRouteName={NavigatorConstant.NAVIGATOR.UsersTabsNavigator}
      screenOptions={{
        headerShown: true,
        tabBarStyle: { backgroundColor: '#E01D6F' },
      }}>
      <Tab.Screen
        name={NavigatorConstant.USER_TABS.HOME}
        component={UserNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Image style={styles.icon} source={require('../assets/icons/home.png')} size={26} />
          ),
          tabBarActiveTintColor:'white',
          
          tabBarInactiveTintColor:'black',
        }}
      />
      <Tab.Screen
        name={NavigatorConstant.USER_TABS.FILTERS}
        component={UFilters}
        options={{
          headerStyle: { backgroundColor: '#E01D6F' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'normal' },
          headerTitleAlign: 'center',
          tabBarLabel: '',
          tabBarIcon: ({ }) => (
            <Image style={styles.icon} source={require('../assets/icons/search.png')} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={NavigatorConstant.USER_TABS.BOOKINGS}
        component={BookingsNavigator}
        options={{
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({ }) => (
            <Image style={styles.icon} source={require('../assets/icons/bookmark.png')} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name={NavigatorConstant.USER_TABS.PROFILE}
        component={UserProfile}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarLabel: '',
          tabBarIcon: ({
            
           }) => (
            <Image style={styles.icon} source={require('../assets/icons/settings.png')} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
