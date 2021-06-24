import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { InitialScreen } from "../pages/InitialScreen";
import { UserIdentification } from "../pages/UserIdentification";
import { Confirmation } from "../pages/Confirmation";
import colors from "../styles/colors";
import { SavePlant } from "../pages/SavePlant";

import { AuthRoutes } from "./tab.routes";

const Stack = createStackNavigator();

export const StackRoutes: React.FC = () => (
  <Stack.Navigator
    initialRouteName="InitialScreen"
    headerMode="none"
    screenOptions={{ cardStyle: { backgroundColor: colors.white } }}
  >
    <Stack.Screen name="InitialScreen" component={InitialScreen} />
    <Stack.Screen name="UserIdentification" component={UserIdentification} />
    <Stack.Screen name="Confirmation" component={Confirmation} />
    <Stack.Screen name="PlantSelect" component={AuthRoutes} />
    <Stack.Screen name="MyPlants" component={AuthRoutes} />
    <Stack.Screen name="SavePlant" component={SavePlant} />
  </Stack.Navigator>
);
