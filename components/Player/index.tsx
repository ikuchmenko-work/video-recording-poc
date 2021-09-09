import React from 'react';
import {Button, Text, View} from "react-native";
import {NavigationProp} from "@react-navigation/native";

type Props = {
    navigation: NavigationProp<any>
}

const Player = ({navigation}: Props) => {
    return (
        <View>
            <Text>Player screen</Text>
            <Button title={"Home"} onPress={()=>{navigation.navigate("Home")}} />
            <Button title={"Go back"} onPress={()=>{navigation.goBack()}} />
        </View>
    );
};

export default Player;
