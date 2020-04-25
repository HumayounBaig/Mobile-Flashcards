import React, { useState } from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { styles, colors } from '../styles/styles';
import { addDeck } from '../utils/dataHandler'

export default function AddDecks({navigation}) {
  const [value, setValue] = useState("")

  const handleChangeText = text => {
    setValue(text);
  }

  const handleSubmit = async() => {
    console.log("fads",navigation);
      
    await addDeck(value)
    setValue("")
    navigation.goBack();
  
      
   
  
     
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
            style={[styles.button, { backgroundColor: disabled ? colors.disabled : colors.green, marginTop: 40 }]}
            disabled={disabled}
          >
            <Text onPress={handleSubmit} style={styles.text}>Create Deck</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>

      </SafeAreaView>
    </View>
  );
}


