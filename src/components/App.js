import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { StyleSheet } from 'react-native';
import DeckList from './DeckList';
import DeckDetails from './DeckDetails';
import AddDecks from './AddDecks';
import AddCard from './AddCard'
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from  'redux-thunk';
import reducer from '../redux/reducers/index';
import { setLocalNotification, sendPushNotification } from '../utils/notificaationHandler'
import Quiz from './Quiz'

const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

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
      <DecksStack.Screen name="quiz" component={Quiz} options={{
          headerTitle: "Quiz",
        }}
      />
    </DecksStack.Navigator>
  )
}

const Tab = createBottomTabNavigator();

export default function App() {

  useEffect(() => {
    setLocalNotification();
     
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

function AppNavigator (){
 
  return(
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'decks') {
              iconName = focused
                ? 'md-folder'
                : 'md-folder-open';
            } else if (route.name === 'addDecks') {
              iconName = focused ? 'ios-list-box' : 'ios-list';
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{ 
          inactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen name="decks" component={DecksStackScreen} />
        <Tab.Screen name="addDecks" component={AddDecks} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
