import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { styles, colors } from '../styles/styles';
import { addDeckAS } from '../utils/dataHandler'
import { connect } from 'react-redux';
import { addDeck } from '../redux/actions'

function AddDecks({navigation, addDeck}) {
  const [value, setValue] = useState("")

  const handleChangeText = text => {
    setValue(text);
  }

  const handleSubmit = async() => {
    let deckData = {
      title: value,
      id: Math.random().toString(36).substring(7)
    }
    addDeck(deckData)
    await addDeckAS(deckData)
    setValue("")
    
    navigation.navigate("deckDetails", deckData);
  }

  const disabled = value === "";

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAvoidingView keyboardShouldPersistTaps='handled'>
          <Text style={[styles.heading, { marginBottom: 20 }]}>What is the title of your new deck?</Text>

          <TextInput
            value={value}
            style={styles.input}
            placeholder="Deck Title"
            onChangeText={handleChangeText}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, { backgroundColor: disabled ? colors.disabled : colors.green, marginTop: 20 }]}
            disabled={disabled}
            value ={value}
          >
            <Text style={styles.text}>Create Deck</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </View>
  );
}

export default connect (
  null, 
  { addDeck }
)(AddDecks);
