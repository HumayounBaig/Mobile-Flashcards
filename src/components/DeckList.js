import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';

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

  
  function Item({ item }) {
    const {title, count} = item 
    return (
      <TouchableOpacity style={styles.item} onPress={()=> props.navigation.navigate("deckDetails", {deck: item})}>
        <Text style={styles.title}>{title}</Text>
        <Text>{count}</Text>
      </TouchableOpacity>
    );
  }

  return (
      <View style={styles.container}>
          <SafeAreaView>
          <FlatList
            data={DATA}
            renderItem={({item})=> <Item item={item}/>}
            keyExtractor={item => item.id}
          />
      
          </SafeAreaView>
      </View>
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
