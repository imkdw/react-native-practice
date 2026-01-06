import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from "expo-system-ui";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { scheduleOnRN } from "react-native-worklets";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [splashAnimationComplete, setSplashAnimationComplete] = useState(false);

  const logoScale = useSharedValue(0.3);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const containerOpacity = useSharedValue(1);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync("#ffffff");
  }, []);

  useEffect(() => {
    async function prepare() {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onSplashAnimationComplete = useCallback(() => {
    setSplashAnimationComplete(true);
  }, []);

  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();

      logoOpacity.value = withTiming(1, { duration: 400 });
      logoScale.value = withSequence(
        withSpring(1.1, { damping: 8, stiffness: 100 }),
        withSpring(1, { damping: 10, stiffness: 100 })
      );

      textOpacity.value = withDelay(300, withTiming(1, { duration: 400 }));

      containerOpacity.value = withDelay(
        1200,
        withTiming(0, { duration: 400 }, (finished) => {
          "worklet";
          if (finished) {
            scheduleOnRN(onSplashAnimationComplete);
          }
        })
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appIsReady]);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    opacity: containerOpacity.value,
  }));

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          animationDuration: 250,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="create-todo"
          options={{
            animation: "slide_from_bottom",
            gestureDirection: "vertical",
          }}
        />
        <Stack.Screen
          name="edit-todo"
          options={{
            animation: "slide_from_bottom",
            gestureDirection: "vertical",
          }}
        />
      </Stack>

      {!splashAnimationComplete && (
        <Animated.View style={[styles.splashContainer, containerAnimatedStyle]} pointerEvents="none">
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <View style={styles.logoCircle}>
              <Ionicons name="checkbox" size={48} color="#fff" />
            </View>
          </Animated.View>
          <Animated.Text style={[styles.appTitle, textAnimatedStyle]}>Todo</Animated.Text>
          <Animated.Text style={[styles.appSubtitle, textAnimatedStyle]}>할 일을 관리하세요</Animated.Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  splashContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1F2937",
    marginTop: 16,
  },
  appSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    marginTop: 8,
  },
});
