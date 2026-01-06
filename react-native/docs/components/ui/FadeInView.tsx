import React, { useEffect, useRef, type PropsWithChildren } from "react";
import { Animated, Text, View, type ViewStyle } from "react-native";

type Props = PropsWithChildren<{ style: ViewStyle }>;

const FadeInView: React.FC<Props> = (props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <Animated.View // Special animatable View
      style={{
        ...props.style,
        opacity: fadeAnim, // Bind opacity to animated value
      }}
    >
      {props.children}
    </Animated.View>
  );
};

export default () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FadeInView
        style={{
          width: 250,
          height: 50,
          backgroundColor: "powderblue",
        }}
      >
        <Text style={{ fontSize: 28, textAlign: "center", margin: 10 }}>Fading in</Text>
      </FadeInView>
    </View>
  );
};
