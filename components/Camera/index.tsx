import React from 'react';
import {Button, Text, View} from "react-native";
import {NavigationProp} from "@react-navigation/native";

type Props = {
    navigation: NavigationProp<any>
}

const CameraComponent = ({navigation}: Props) => {
    return (
        <View>
            <Text>Record a video!</Text>
            <Button title={"Watch video"} onPress={()=>{navigation.navigate("Player")}}/>
        </View>
    );
};

export default CameraComponent;
