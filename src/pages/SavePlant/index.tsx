import React, { useState } from "react";

import { useRoute } from "@react-navigation/core";
import {
  Alert,
  Image,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SvgFromUri } from "react-native-svg";
import waterDropImage from "../../assets/waterdrop.png";
import { Button } from "../../components/Buttons/Button";
import DateTimePicker, { Event } from "@react-native-community/datetimepicker";
import { isBefore } from "date-fns";
import { PlantProps, plantSave } from "../../libs/storage";

import { styles } from "./styles";
import { format } from "date-fns/esm";
import { useNavigation } from "@react-navigation/native";

interface SavePlantParams {
  plant: PlantProps;
}

export function SavePlant() {
  const { params } = useRoute();
  const { plant } = params as SavePlantParams;
  const navigation = useNavigation();
  const [timeSelected, setTimeSelected] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(Platform.OS === "ios");

  function handleShowDatePickerForAndroid() {
    setShowDatePicker(!showDatePicker);
  }
  function handlechangeTime(event: Event, dateTime: Date | undefined) {
    if (Platform.OS === "ios") {
      setShowDatePicker(!showDatePicker);
    }

    if (dateTime && isBefore(dateTime, new Date())) {
      setTimeSelected(new Date());
      return Alert.alert("Escolha uma hora no futuro ⏰");
    }

    if (dateTime) setTimeSelected(dateTime);

    if (!event.cancelable || !event.isTrusted) handleShowDatePickerForAndroid();
  }

  async function handleSavePlant() {
    try {
      await plantSave({
        ...plant,
        dateTimeNotification: timeSelected,
      });

      navigation.navigate("Confirmation", {
        title: "Tudo certo",
        subtitle:
          "Fique tranquilo que sempre vamos lembrar você de cuidar da sua plantinha com muito cuidado.",
        buttonTitle: "Muito obrigado",
        icon: "hug",
        nextScreen: "MyPlants",
      });
    } catch {
      Alert.alert("Não foi possivel salvar😢. Tente novamente");
    }
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      <View style={styles.container}>
        <View style={styles.plantInfo}>
          <SvgFromUri uri={plant.photo} width={150} height={150} />

          <Text style={styles.plantName}>{plant.name}</Text>
          <Text style={styles.plantAbout}>{plant.about}</Text>
        </View>
      </View>

      <View style={styles.controller}>
        <View style={styles.tipContainer}>
          <Image source={waterDropImage} style={styles.tipImage} />
          <Text style={styles.tipText}>{plant.water_tips}</Text>
        </View>

        <Text style={styles.alertLabel}>
          Escolha o melhor horário para ser lembrado:
        </Text>

        {showDatePicker && (
          <DateTimePicker
            value={timeSelected}
            mode="time"
            display="spinner"
            onChange={handlechangeTime}
          />
        )}

        {Platform.OS === "android" && (
          <TouchableOpacity
            style={styles.changeDatebutton}
            onPress={handleShowDatePickerForAndroid}
          >
            <Text style={styles.changeDateText}>{`Mudar ${format(
              timeSelected,
              "HH:mm"
            )}`}</Text>
          </TouchableOpacity>
        )}
        <Button onPress={handleSavePlant}>Cadastrar planta</Button>
      </View>
    </ScrollView>
  );
}
