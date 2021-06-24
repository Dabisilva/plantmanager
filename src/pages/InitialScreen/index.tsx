import React from "react";
import {
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import WateringImage from "../../assets/watering.png";
import { Feather } from "@expo/vector-icons";
import colors from "../../styles/colors";

import { styles } from "./styles";
import { useNavigation } from "@react-navigation/core";

export function InitialScreen() {
  const navigation = useNavigation();

  function handleSubmit() {
    navigation.navigate("UserIdentification");
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>
          Gerencie {"\n"}
          suas plantas de{"\n"}
          forma fácil!
        </Text>
        <Image
          style={styles.image}
          source={WateringImage}
          resizeMode="contain"
        />
        <Text style={styles.text}>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar
        </Text>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleSubmit}
        >
          <Feather name="chevron-right" size={32} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
