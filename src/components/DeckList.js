import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import {styles} from '../styles/styles'


export default function DeckList(props) {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
      count: 3
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
      count: 1
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
      count: 2
    },
  ];

  return (
      <View style={styles.container}>
          <SafeAreaView>
          <FlatList
            data={DATA}
            renderItem={({item})=> <RenderItem item={item}/>}
            keyExtractor={item => item.id}
          />
      
          </SafeAreaView>
      </View>
  );
} 

function RenderItem({ item }) {
  const {title, count} = item 
  return (
    <TouchableOpacity style={styles.listItem} onPress={()=> props.navigation.navigate("deckDetails", {deck: item})}>
      <Text style={styles.heading}>{title}</Text>
      <Text style={[styles.mutedText, {marginTop: 5}]}>{count} cards</Text>
    </TouchableOpacity>
  );
}
