import React from 'react';
import { View, Text, Alert, SafeAreaView, TouchableOpacity, AsyncStorage } from 'react-native';
import { styles, colors } from '../styles/styles';
import MoveToBottom from '../helpers/MoveToBottom'

export default function DeckDetails({ route, navigation }) {
  console.log(route)
  const { deck } = route.params
 
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: deck.title
    })
  }, [navigation]);

  
  
  function handleOnPress() {
    Alert.alert(
      `Are you sure you want to delete ${deck.title}`,
      "",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        {
          text: "Delete",
          onPress: () => handleDelete(),
          style: "destructive"

        },

      ],
      { cancelable: false }
    );
  }

  function handleDelete(){

    navigation.pop()
  }

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={{height: "90%", justifyContent: 'center' }}>
          
          <View style={{ alignItems: 'center', marginBottom: 40}}>
            <Text style={styles.heading}>{deck.title}</Text>
            <Text>{deck.count} Cards</Text>
          </View>
          
          <TouchableOpacity 
            style={[styles.button, { backgroundColor: colors.blue, marginBottom: 20}]}
            onPress={()=> navigation.navigate("addCard")}
          >
            
            <Text style={styles.text}>Add Card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, { backgroundColor: colors.green  }]}>
            <Text style={styles.text}>Start Quiz</Text>
          </TouchableOpacity>
        </View>


        {
          MoveToBottom(
            <TouchableOpacity style={styles.deleteButton}>
              <Text style={[styles.text, { color: "red" }]} onPress={handleOnPress}>Delete Deck</Text>
            </TouchableOpacity>
          )
        }


      </SafeAreaView>
    </View>
  );
}


