import React, {useState }from 'react';
import { View, Text, SafeAreaView, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { styles, colors } from '../styles/styles';
import { connect } from 'react-redux';
import { addCardDeck } from '../redux/actions'
import { addCardAS } from '../utils/dataHandler'

function AddCard({navigation, addCardDeck, title}) {

  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("")

  const disabled = (question === "" || answer === "") ? true : false;
  const handleSubmit = async() => {
    addCardDeck(title, {
      question, 
      answer
    })
    await addCardAS(
      title, {
        question, 
        answer
      }
    )
    setQuestion("")
    setAnswer("")
    navigation.goBack();
  } 

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <KeyboardAvoidingView behavior="padding">
          <View style={{ height: "100%", justifyContent: 'center' }}>
            <Text style={[styles.heading, { marginBottom: 40 }]}>Please enter following to add new card</Text>
            <TextInput style={styles.input} value={question} placeholder="Enter Question" onChangeText={setQuestion} />
            <TextInput style={styles.input} value={answer} placeholder="Enter Answer" onChangeText={setAnswer}/>

            <TouchableOpacity onPress={handleSubmit} style={[styles.button, { backgroundColor: disabled ? colors.disabled : colors.blue, marginTop: 40 }]}>
              <Text style={styles.text}>Submit</Text>
            </TouchableOpacity>
          </View>

        </KeyboardAvoidingView>

      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = (state, {route}) => {
  const {title} = route.params
  return {
    title
  }
  
}

export default connect(
  mapStateToProps,
  {addCardDeck}
)(AddCard)
