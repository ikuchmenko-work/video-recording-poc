import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";
import AnimatedValue = Animated.AnimatedValue;

interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  const animationVariable = useRef<AnimatedValue>(
    new Animated.Value(0)
  ).current;

  const animate = () => {
    Animated.timing(animationVariable, {
      toValue: progress,
      useNativeDriver: false,
      easing: Easing.linear,
      duration: 10,
    }).start();
  };

  useEffect(() => {
    animate();
  }, [progress]);

  const animatedStyle = {
    width: animationVariable.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"],
    }),
    height: 30,
    backgroundColor: "red",
  };

  return (
    <View style={styles.progressBarContainer}>
      <Animated.View style={animatedStyle} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: 30,
    backgroundColor: "#ecf0f1",
    marginBottom: 10,
  },
  progressBarContainer: {
    borderWidth: 2,
    borderColor: "#000",
    borderRadius: 5,
    width: "95%",
    alignSelf: "center",
    margin: 5
  },
});

export default ProgressBar;
