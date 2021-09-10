import React, { useRef, useCallback } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Video } from "expo-av";
import * as Sharing from "expo-sharing";
import Ionicons from "@expo/vector-icons/Ionicons";

const Player: React.FC = ({ route, navigation }: any) => {
  const video = useRef<Video | null>(null);
  const data = route.params;

  const shareVideo = useCallback(() => {
    Sharing.shareAsync(data.uri);
  }, [data]);

  const goHome = () => navigation.navigate("Home");
  const goBack = () => navigation.goBack();

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
        shouldPlay={true}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={goHome}>
          <Text style={styles.text}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.text}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={shareVideo}>
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
    backgroundColor: "transparent",
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
  button: {
    alignSelf: "flex-end",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    backgroundColor: "black",
    marginHorizontal: 10,
    height: 50,
  },
  text: {
    fontSize: 18,
    color: "white",
  },
  video: {
    flex: 1,
  },
});

export default Player;
