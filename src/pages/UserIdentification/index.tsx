import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Button } from "../../components/Buttons/Button";
import { useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { styles } from "./styles";

export function UserIdentification() {
  const navigation = useNavigation();

  const [isFocused, setIsfocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [name, setName] = useState<string>();
  function handleInputBlur() {
    setIsfocused(false);
    setIsFilled(!!name);
  }

  function handleInputfocus() {
    setIsfocused(true);
  }

  function handleInputChange(value: string) {
    setIsFilled(!!value);
    setName(value);
  }

  async function handleSubmit() {
    if (!name || name.length < 2)
      return Alert.alert("Me diz como chamar você 😢");

    try {
      await AsyncStorage.setItem("@plantmanager:user", name);
      navigation.navigate("Confirmation", {
        title: "Prontinho",
        subtitle: "Agora vamos começas a cuidar das suas plantas com cuidado.",
        buttonTitle: "Começar",
        icon: "smile",
        nextScreen: "PlantSelect",
      });
    } catch {
      Alert.alert("Não foi possivel salvar seu nome, tente novamente 😢");
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.form}>
              <View style={styles.heading}>
                <Text style={styles.emoji}>{isFilled ? "😄" : "🙂"}</Text>
                <Text style={styles.title}>
                  Como podemos {"\n"} chamar você?
                </Text>
              </View>

              <TextInput
                style={[
                  styles.input,
                  (isFocused || isFilled) && { borderColor: colors.green },
                ]}
                placeholder="Digite um nome"
                onBlur={handleInputBlur}
                onFocus={handleInputfocus}
                onChangeText={handleInputChange}
                value={name}
              />

              <View style={styles.buttonContent}>
                <Button onPress={handleSubmit}>Confirmar</Button>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
