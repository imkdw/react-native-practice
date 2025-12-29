import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import "react-native-reanimated";

import LotsOfStyles from "@/components/ui/lots-of-styles";
import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <LotsOfStyles />
    </ThemeProvider>
  );
}
