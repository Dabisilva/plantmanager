import React, { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton, RectButtonProps } from "react-native-gesture-handler";
import colors from "../../styles/colors";
import fonts from "../../styles/fonts";

interface EnviromentButtonProps extends RectButtonProps {
  children: ReactNode;
  active?: boolean;
}

export function EnviromentButton({
  children,
  active = false,
  ...rest
}: EnviromentButtonProps) {
  return (
    <RectButton
      style={[styles.container, active && styles.activeContainer]}
      {...rest}
    >
      <Text style={active ? styles.textActive : styles.text}>{children}</Text>
    </RectButton>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.shape,
    width: 76,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  text: {
    color: colors.heading,
    fontFamily: fonts.text,
  },
  activeContainer: {
    backgroundColor: colors.green_light,
  },
  textActive: {
    color: colors.green_dark,
    fontFamily: fonts.heading,
  },
});
