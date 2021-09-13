import React from 'react';
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import Player from "../../components/Player";
import CameraComponent from "../../components/Camera";

const Stack = createNativeStackNavigator();

const CameraScreen = () => {
    return (
        <Stack.Navigator initialRouteName={"Record"}>
            <Stack.Screen name={"Record"}  component={CameraComponent}/>
            <Stack.Screen name={"Player"}  component={Player}/>
        </Stack.Navigator>
    );
};

export default CameraScreen;
