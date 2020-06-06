import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import InitialHome from '../home/initial_home';
import { StatusBar, Image, View } from 'react-native'
import Home from '../home/home';
const Stack = createStackNavigator();
function renderHomeHeader() {
    return (
        <View>
            <Image source={require('../assets/logo-header.png')} />
        </View>
    )
}
function AppNavigation() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" />
            <Stack.Navigator>
                <Stack.Screen
                    name={"InitialHome"}
                    component={InitialHome}
                    options={{ headerShown: false, }}
                />
                <Stack.Screen name={"Home"} component={Home} options={{ headerShown: false, }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppNavigation;