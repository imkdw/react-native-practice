import { Image, ImageStyle, StyleProp } from "react-native";

const images: Record<string, any> = {
  "luffy.png": require("@/assets/images/luffy.png"),
};

type Props = {
  name: keyof typeof images;
  style?: StyleProp<ImageStyle>;
};

export default function MyImage({ name, style }: Props) {
  return <Image source={images[name]} style={[{ width: 200, height: 200 }, style]} />;
}
