import React, {useRef} from 'react';
import {Button, StyleSheet, View} from "react-native";
import {Video} from "expo-av";

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
            <Button title={"Home"} onPress={()=>{navigation.navigate("Home")}} />
            <Button title={"Go back"} onPress={()=>{navigation.goBack()}} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: "center",
        margin: 20,
    },
    button: {
        flex: 0.5,
        alignSelf: 'flex-end',
        alignItems: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: "black",
        borderRadius: 5,
        backgroundColor: "black",
        marginHorizontal: 10
    },
    flipBtn: {
        flex: 0.3,
        backgroundColor: "transparent"
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'row'
    },
    fixedRatio:{
        flex: 1,
        // aspectRatio: 1
    },
    video: {
        flex: 1,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Player;
