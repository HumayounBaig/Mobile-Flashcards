import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, AsyncStorage, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import {styles} from '../styles/styles';
import { handleInitialData } from '../redux/actions'

function DeckList({navigation, decks, handleInitialData}) {
  const [loading, setLoading] = useState(decks ? false : true);

  useEffect(() => {
    handleInitialData();
    
  }, []);

  const fetchData = async() =>{
    setLoading(true)
    handleInitialData();
    setLoading(false)
  }


  function RenderItem({ item }) {

    const {title, questions} = item 
    return (
      <TouchableOpacity style={styles.listItem} onPress={()=> navigation.navigate("deckDetails", {title: item.title})}>
        <Text style={styles.heading}>{title}</Text>
        <Text style={[styles.mutedText, {marginTop: 5}]}>{questions.length ? `${questions.length} cards` : "No cards found"} </Text>
      </TouchableOpacity>
    );
  }

  return (
      <View style={styles.container}>
          <SafeAreaView>
            <FlatList
              data={Object.values(decks)}
              renderItem={({item})=> <RenderItem item={item}/>}
              keyExtractor={item => item.title}
              onRefresh={fetchData}
              refreshing={loading}
              
            />
          
      
          </SafeAreaView>
      </View>
  );
} 

const mapStateToProps = state => ({
  decks: state
})

export default connect(
  mapStateToProps,
  { handleInitialData }
)(DeckList)
