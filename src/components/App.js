import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet } from 'react-native';
import DeckList from './DeckList';
import DeckDetails from './DeckDetails';
import AddDecks from './AddDecks';
import AddCard from './AddCard'
import { Ionicons } from '@expo/vector-icons';

const DecksStack = createStackNavigator();

function DecksStackScreen() {
  return (
    <DecksStack.Navigator>
      <DecksStack.Screen name="deckList" component={DeckList} options={{
          headerTitle: "Decks",
        }}/>
      <DecksStack.Screen name="deckDetails" component={DeckDetails} />
      <DecksStack.Screen name="addCard" component={AddCard} options={{
          headerTitle: "Add Card",
        }}
      />
    </DecksStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Decks') {
              iconName = focused
                ? 'md-folder'
                : 'md-folder-open';
            } else if (route.name === 'Add Decks') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          // activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="Decks" component={DecksStackScreen} />
        <Tab.Screen name="Add Decks" component={AddDecks} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
