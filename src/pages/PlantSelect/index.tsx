import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import { EnviromentButton } from "../../components/Buttons/EnviromentButton";
import api from "../../services/api";
import { Header } from "../../components/Header";
import { Load } from "../../components/Load";
import { PlantCardPrimary } from "../../components/PlantsCard/PlantCardPrimary";
import colors from "../../styles/colors";
import { useNavigation } from "@react-navigation/native";
import { PlantProps } from "../../libs/storage";

import { styles } from "./styles";

interface EnviromentProps {
  key: string;
  title: string;
}

export function PlantSelect() {
  const navigation = useNavigation();
  const [enviroments, setEnviroments] = useState<EnviromentProps[]>([]);
  const [plants, setPlants] = useState<PlantProps[]>([]);
  const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
  const [enviromentSelected, setEnviromentSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  function handleEnviromentSelect(environment: string) {
    setEnviromentSelected(environment);

    if (environment == "all") return setFilteredPlants(plants);

    const filtered = plants.filter((plant) =>
      plant.environments.includes(environment)
    );
    setFilteredPlants(filtered);
  }

  function handleFetchMore(distance: number) {
    if (distance < 1) return;

    setLoadingMore(true);
    setPage(page + 1);
    getPlantList();
  }

  function handleSavePlant(plant: PlantProps) {
    navigation.navigate("SavePlant", { plant });
  }

  async function getEnviroments() {
    const { data } = await api.get("plants_environments?_sort=title&order=asc");
    setEnviroments([{ key: "all", title: "Todos" }, ...data]);
  }

  async function getPlantList() {
    const { data } = await api.get(
      `plants?_sort=name&order=asc&_page=${page}&_limit=8`
    );

    if (!data) return setLoading(true);

    if (page > 1) {
      setPlants((oldValue) => [...oldValue, ...data]);
      setFilteredPlants((oldValue) => [...oldValue, ...data]);
    } else {
      setPlants(data);
      setFilteredPlants(data);
    }
    setLoading(false);
    setLoadingMore(false);
  }

  useEffect(() => {
    getEnviroments();
    getPlantList();
  }, []);

  if (loading) {
    return <Load />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Header />

        <Text style={styles.title}>Em qual ambiente</Text>

        <Text style={styles.subtitle}>você quer colocar sua planta?</Text>
      </View>

      <View>
        <FlatList
          data={enviroments}
          keyExtractor={(item) => String(item.key)}
          showsHorizontalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.enviromentList}
          renderItem={({ item: enviroment }) => (
            <EnviromentButton
              active={enviroment.key === enviromentSelected}
              onPress={() => handleEnviromentSelect(enviroment.key)}
            >
              {enviroment.title}
            </EnviromentButton>
          )}
        />
      </View>
      <View style={styles.plants}>
        <FlatList
          data={filteredPlants}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          contentContainerStyle={styles.contentPlants}
          onEndReachedThreshold={0.1}
          onEndReached={({ distanceFromEnd }) => {
            handleFetchMore(distanceFromEnd);
          }}
          ListFooterComponent={
            loadingMore ? (
              <ActivityIndicator color={colors.green} size={32} />
            ) : (
              <></>
            )
          }
          renderItem={({ item: plant }) => (
            <PlantCardPrimary
              onPress={() => handleSavePlant(plant)}
              data={plant}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
}
