import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';


const Stack = createStackNavigator();

import Home from '../pages/Home';
import Scan from '../pages/Scan';
import SignUp from '../pages/SignUp';



export default function StackScreens(){
    return (
        <Stack.Navigator initialRouteName='SignUp' screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name='Home' component={Home}/>
            <Stack.Screen name='Scan' component={Scan}/>
            <Stack.Screen name='SignUp' component={SignUp}/>
        </Stack.Navigator>
    )
}

