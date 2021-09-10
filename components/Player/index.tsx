import React, {useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Video} from "expo-av";
import * as Sharing from 'expo-sharing';
import Ionicons from "@expo/vector-icons/Ionicons";

const Player = ({route, navigation}: any) => {
    const video = useRef(null);
    const data = route.params;
    return (
        <View style={styles.container}>
            <Video
                ref={video}
                style={styles.video}
                source={{
                    uri: data.uri,
                }}
                useNativeControls
                isLooping={true}
                resizeMode="contain"
            />
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("Home")}}>
                    <Text style={styles.text}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{navigation.goBack()}}>
                    <Text style={styles.text}>Go back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={()=>{Sharing.shareAsync(data.uri)}}>
                    <Ionicons name={"share"} color={"white"} size={25} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonContainer: {
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: "center",
        margin: 20,
    },
    button: {
        alignSelf: 'flex-end',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        backgroundColor: "black",
        marginHorizontal: 10,
        height: 50
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    video: {
        flex: 1,
    }
});

export default Player;
