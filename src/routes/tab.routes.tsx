import React from "react";
import { Platform } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { PlantSelect } from "../pages/PlantSelect";
import { MyPlants } from "../pages/MyPlants";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../styles/colors";

const Tab = createBottomTabNavigator();

export const AuthRoutes: React.FC = () => (
  <Tab.Navigator
    initialRouteName="PlantSelect"
    tabBarOptions={{
      activeTintColor: colors.green,
      inactiveTintColor: colors.heading,
      labelPosition: "beside-icon",
      style: {
        height: 88,
        paddingVertical: Platform.OS === "ios" ? 20 : 0,
      },
    }}
  >
    <Tab.Screen
      name="PlantSelect"
      component={PlantSelect}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons name="add-circle-outline" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="MyPlants"
      component={MyPlants}
      options={{
        tabBarIcon: ({ size, color }) => (
          <MaterialIcons
            name="format-list-bulleted"
            size={size}
            color={color}
          />
        ),
      }}
    />
  </Tab.Navigator>
);
