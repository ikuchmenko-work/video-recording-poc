import React from 'react';
import {NavigationContainer} from "@react-navigation/native";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import CameraScreen from "./screens/CameraScreen";
import HomeScreen from "./screens/HomeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName={"Home"} screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}: any) => {
                let iconName: any;
                if (route.name === "Home") {
                    iconName = focused ? "home" : "home-outline";
                } else if (route.name === "Camera") {
                    iconName = focused ? "camera" : "camera-outline";
                }
                return <Ionicons name={iconName} size={size} color={color} />;
            }
        })} >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Camera" component={CameraScreen}/>
        </Tab.Navigator>
      </NavigationContainer>
  );
}

