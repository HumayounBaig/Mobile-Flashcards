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
    addDeck(value)
    await addDeckAS(value)
    setValue("")
    navigation.navigate("deckList");
  }

  const disabled = value === "";

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAvoidingView keyboardShouldPersistTaps='handled'>
          <Text style={[styles.heading, { marginBottom: 40 }]}>What is the title of your new deck?</Text>

          <TextInput
            value={value}
            style={styles.input}
            placeholder="Deck Title"
            onChangeText={handleChangeText}
          />

          <TouchableOpacity
            onPress={handleSubmit}
            style={[styles.button, { backgroundColor: disabled ? colors.disabled : colors.green, marginTop: 40 }]}
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
