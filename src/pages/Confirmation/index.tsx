import React from "react";

import { SafeAreaView, Text, View } from "react-native";
import { Button } from "../../components/Buttons/Button";
import { useNavigation, useRoute } from "@react-navigation/core";

import { styles } from "./styles";

interface Params {
  title: string;
  subtitle: string;
  buttonTitle: string;
  icon: "smile" | "hug";
  nextScreen: string;
}

const emojis = {
  hug: "🤗",
  smile: "😄",
};

export function Confirmation() {
  const navigation = useNavigation();

  const { params } = useRoute();

  const { title, subtitle, buttonTitle, icon, nextScreen } = params as Params;
  function handleGoToPlantSelect() {
    navigation.navigate(nextScreen);
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emojis[icon]}</Text>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subTitle}>{subtitle}</Text>
        <View style={styles.footer}>
          <Button onPress={handleGoToPlantSelect}>{buttonTitle}</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
