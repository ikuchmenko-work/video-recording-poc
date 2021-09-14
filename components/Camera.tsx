import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import { Camera } from "expo-camera";
import Ionicons from "@expo/vector-icons/Ionicons";
import { FontAwesome } from "@expo/vector-icons";
import { WINDOW_HEIGHT, WINDOW_WIDTH } from "../constants";
import { CameraType } from "expo-camera/build/Camera.types";

import ProgressBar from "./ProgressBar";
import AnimatedValue = Animated.AnimatedValue;

const CameraComponent: React.FC = ({ navigation }: any) => {
  const [hasAudioPermission, setHasAudioPermission] = useState<boolean | null>(
    null
  );
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [type, setType] = useState<CameraType>(Camera.Constants.Type.back);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const camera = useRef<Camera | null>(null);

  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === "granted");

      const audioStatus = await Camera.requestMicrophonePermissionsAsync();
      setHasAudioPermission(audioStatus.status === "granted");
    })();
  }, []);

  const animate = () => {
    let progress = 0;
    setProgress(progress);
    const timer = setInterval(() => {
      progress += 0.01;
      if (progress > 1) {
        progress = 1;
        clearInterval(timer);
      }
      setProgress(progress);
    }, 30);
  };

  const setCameraType = useCallback(() => {
    setType((prevState: CameraType) =>
      prevState === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  }, [type]);

  const animationVariable = useRef<AnimatedValue>(
    new Animated.Value(0)
  ).current;
  const animateProgress = useCallback(() => {
    Animated.timing(animationVariable, {
      toValue: 1,
      useNativeDriver: false,
      duration: 4000,
    }).start();
  }, []);
  const resetAnimation = () => {
    Animated.timing(animationVariable, {
      toValue: 0,
      useNativeDriver: false,
      duration: 200,
    }).start();
  };
  const animatedStyle = {
    width: animationVariable.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    }),
    height: 30,
    backgroundColor: "red",
  };

  const takeVideo = useCallback(async () => {
    animate();
    animateProgress();
    setIsRecording(true);
    await camera.current
      ?.recordAsync({
        maxDuration: 3,
        quality: "720p",
      })
      .then((res) => {
        navigation.navigate("Player", {
          uri: res.uri,
        });
        setProgress(0);
        resetAnimation();
      });
    setIsRecording(false);
  }, []);

  if (hasCameraPermission === null || hasAudioPermission === null) {
    return <View />;
  }
  if (!hasCameraPermission || !hasAudioPermission) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={styles.cameraContainer}>
      {isFocused && (
        <Camera
          ref={camera}
          style={styles.fixedRatio}
          type={type}
          ratio={"4:3"}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.actionBtn} onPress={takeVideo}>
              <FontAwesome
                name="circle"
                size={60}
                color={isRecording ? "red" : "white"}
              />
            </TouchableOpacity>

            <TouchableOpacity style={styles.actionBtn} onPress={setCameraType}>
              <Ionicons name={"camera-reverse"} color={"white"} size={40} />
            </TouchableOpacity>
          </View>
        </Camera>
      )}
      <ProgressBar progress={progress} />
      <View style={styles.progressBarContainer}>
        <Animated.View style={animatedStyle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    paddingBottom: 20,
  },
  flipBtn: {
    flex: 1,
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  actionBtn: {
    margin: 5,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: "column",
  },
  fixedRatio: {
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT * 0.7,
  },
  video: {
    alignSelf: "center",
    width: 350,
    height: 220,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  progressBarContainer: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 5,
    width: "95%",
    alignSelf: "center",
    margin: 5,
  },
});

export default CameraComponent;
