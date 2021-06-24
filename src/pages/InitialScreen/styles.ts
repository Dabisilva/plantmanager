import { Dimensions, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: fonts.heading,
    textAlign: "center",
    color: colors.heading,

    lineHeight: 32,
    marginTop: 38,
  },
  image: {
    height: Dimensions.get("window").width * 0.7,
  },
  text: {
    textAlign: "center",
    fontFamily: fonts.text,
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  button: {
    backgroundColor: colors.green,
    width: 58,
    height: 58,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,

    marginBottom: 10,
  },
});
