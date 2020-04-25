import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import {styles} from '../styles/styles'
import { getInitialData } from '../utils/dataHandler'

export default function DeckList(props) {
  const [deckData, setDeckData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData()
    
  }, []);

  const fetchData = async() =>{
    setLoading(true)
    const data = await getInitialData();
    setDeckData(data);
    setLoading(false)
  }


  function RenderItem({ item }) {

    const {title, questions} = item 
    return (
      <TouchableOpacity style={styles.listItem} onPress={()=> props.navigation.navigate("deckDetails", {deck: item})}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={[styles.mutedText, {marginTop: 5}]}>{questions.length ? `${questions.length} cards` : "No cards found"} </Text>
      </TouchableOpacity>
    );
  }

  return (
      <View style={styles.container}>
          <SafeAreaView>
          {
            deckData &&
            <FlatList
              data={Object.values(deckData)}
              renderItem={({item})=> <RenderItem item={item}/>}
              keyExtractor={item => item.id}
              onRefresh={fetchData}
              refreshing={loading}
              
            />
          }
          
      
          </SafeAreaView>
      </View>
  );
} 


