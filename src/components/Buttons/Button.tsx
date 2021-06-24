import React, { ReactNode } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface ButtonNextProps extends TouchableOpacityProps {
  children?: ReactNode;
}

export function Button({ children, ...rest }: ButtonNextProps) {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.button} activeOpacity={0.8} {...rest}>
        <Text style={styles.textButton}>{children}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: colors.green,
    width: "100%",
    height: 58,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 16,

    marginBottom: 10,
  },
  textButton: {
    color: colors.white,
    fontFamily: fonts.heading,
    fontSize: 16,
  },
});
