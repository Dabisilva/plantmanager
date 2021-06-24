import React, { useEffect, useState } from "react";

import { Alert, FlatList, Image, Text, View } from "react-native";
import { Header } from "../../components/Header";
import waterDropImage from "../../assets/waterdrop.png";
import { loadPlant, PlantProps, removePlant } from "../../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";
import { PlantCardSecundary } from "../../components/PlantsCard/PlantCardSecundary";
import { Load } from "../../components/Load";

import { styles } from "./styles";

export function MyPlants() {
  const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [nextWaterd, setNextWaterd] = useState<string>();

  function handleRemove(plant: PlantProps) {
    Alert.alert("Remover", `Deseja remover a ${plant.name}?`, [
      {
        text: "Não 🙏",
        onPress: () => {},
        style: "cancel",
      },
      {
        text: "Sim 😢",
        onPress: () => handleRemovePlant(plant.id),
        style: "destructive",
      },
    ]);
  }

  async function handleRemovePlant(id: string) {
    try {
      await removePlant(id);

      setMyPlants((plants) => plants.filter((plant) => plant.id != id));
    } catch (error) {
      Alert.alert("Não foi possivel remover 😢!");
    }
  }

  async function loadStorage() {
    const plantsStoraged = await loadPlant();
    const nextTime = formatDistance(
      new Date(plantsStoraged[0].dateTimeNotification).getTime(),
      new Date().getTime(),
      { locale: pt }
    );

    setMyPlants(plantsStoraged);
    setNextWaterd(
      `Não esqueça de regar a ${plantsStoraged[0].name}, ${nextTime}`
    );
    setLoading(false);
  }

  useEffect(() => {
    loadStorage();
  }, []);

  if (loading) {
    return <Load />;
  }
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.spotlight}>
        <Image source={waterDropImage} style={styles.spotlightImage} />

        <Text style={styles.spotlightText}>{nextWaterd}</Text>
      </View>

      <View style={styles.plants}>
        <Text style={styles.plantsTitle}>Próximas regadas</Text>

        <FlatList
          data={myPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.myPlantsList}
          renderItem={({ item: plant }) => (
            <PlantCardSecundary
              handleRemove={() => handleRemove(plant)}
              data={plant}
            />
          )}
        />
      </View>
    </View>
  );
}
