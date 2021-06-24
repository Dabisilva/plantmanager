import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { styles } from "./styles";

export function Header() {
  const [userName, setUserName] = useState<string | null>("");

  async function getPlantmanagerUser() {
    const name = await AsyncStorage.getItem("@plantmanager:user");

    setUserName(name);
  }

  useEffect(() => {
    getPlantmanagerUser();
  }, []);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá</Text>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      <Image
        style={styles.image}
        source={{ uri: "https://avatars.githubusercontent.com/u/57877449?v=4" }}
      />
    </View>
  );
}
