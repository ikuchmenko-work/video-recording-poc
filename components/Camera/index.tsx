import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp, useIsFocused} from "@react-navigation/native";
import {Camera} from "expo-camera";
import {CameraType} from "expo-camera/build/Camera.types";

type Props = {
    navigation: NavigationProp<any>
}

const CameraComponent = ({navigation}: Props) => {
    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [type, setType] = useState<CameraType>(Camera.Constants.Type.back);
    const isFocused = useIsFocused();
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
        return (()=> {

        })
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (!hasPermission) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {isFocused && <Camera style={styles.camera} type={type}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => {
                      setType(
                          type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back
                      );
                  }}>
                  <Text style={styles.text}> Record video </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{...styles.button, ...styles.flipBtn}}
                  onPress={() => {
                      setType(
                          type === Camera.Constants.Type.back
                              ? Camera.Constants.Type.front
                              : Camera.Constants.Type.back
                      );
                  }}>
                  <Text style={styles.text}> Flip </Text>
                </TouchableOpacity>
              </View>
            </Camera>}
            {/*<Button title={"Watch video"} onPress={()=>{navigation.navigate("Player")}}/>*/}
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
        backgroundColor: "black"
    },
    flipBtn: {
        flex: 0.3,
        backgroundColor: "transparent"
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
});

export default CameraComponent;
