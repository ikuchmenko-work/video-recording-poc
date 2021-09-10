import React, {useState, useEffect} from 'react';
import {Dimensions, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {NavigationProp, useIsFocused} from "@react-navigation/native";
import {Camera} from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from '@expo/vector-icons';

type Props = {
    navigation: NavigationProp<any>
}

const CameraComponent = ({navigation}: Props) => {
    const [hasAudioPermission, setHasAudioPermission] = useState<boolean | null>(null);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const [camera, setCamera] = useState<any>(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [isRecording, setIsRecording] = useState<boolean>(false);

    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync();
            setHasCameraPermission(cameraStatus.status === 'granted');

            const audioStatus = await Camera.requestMicrophonePermissionsAsync();
            setHasAudioPermission(audioStatus.status === 'granted');
        })();
    }, []);

    const takeVideo = async () => {
        if(camera){
            setIsRecording(true);
            const data = await camera.recordAsync({
                maxDuration:3,
                quality: '720p'
            })
            navigation.navigate('Player', {
                uri: data.uri
            })
            setIsRecording(false);
        }
    }

    if (hasCameraPermission === null || hasAudioPermission === null ) {
        return <View />;
    }
    if (!hasCameraPermission || !hasAudioPermission) {
        return <Text>No access to camera</Text>;
    }
    return (
            <View style={styles.cameraContainer}>
                {isFocused &&
                    <Camera
                      ref={(ref) => setCamera(ref)}
                      style={[styles.fixedRatio, {
                          width: Dimensions.get("window").width,
                          height: Dimensions.get("window").height * 0.7
                      }]}
                      type={type}
                      ratio={'4:3'} >
                      <View style={styles.buttonContainer}>

                        <TouchableOpacity onPress={() => takeVideo()} style={styles.button}>
                          <FontAwesome name="circle" size={60} color={isRecording ? "red" : "white"} />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.button}
                          onPress={() => {
                              setType(
                                  type === Camera.Constants.Type.back
                                      ? Camera.Constants.Type.front
                                      : Camera.Constants.Type.back
                              );
                          }}>
                          <Ionicons name={"camera-reverse"} color={"white"} size={40} />

                        </TouchableOpacity>
                      </View>
                    </Camera>
                }
            </View>

    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: "center",
        margin: 20,
    },
    button: {
        alignSelf: 'flex-end',
        padding: 10,
        borderRadius: 5,
    },
    flipBtn: {
        flex: 1,
        backgroundColor: "transparent"
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    cameraContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    fixedRatio:{
        // flex: 1,
    },
    video: {
        alignSelf: 'center',
        width: 350,
        height: 220,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    recordBtn: {
        alignSelf: "center"
    }
});

export default CameraComponent;
