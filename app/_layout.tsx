import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import "react-native-reanimated";

import App from "@/app/App";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <App />
    </ThemeProvider>
  );
}
