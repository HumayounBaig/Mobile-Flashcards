import React, { useState, useEffect, useRef } from 'react';
import { View, Text, SafeAreaView, Dimensions, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { styles, colors } from '../styles/styles';
import { connect } from 'react-redux';
import { setLocalNotification, clearLocalNotification } from '../utils/notificaationHandler'
import ViewPager from '@react-native-community/viewpager';
import { FontAwesome5 } from '@expo/vector-icons';

const view = {
  QUESTION: 'QUESTION',
  ANSWER: 'ANSWER',
  RESULT: 'RESULT'
}

const answer = {
  CORRECT: 'CORRECT',
  INCORRECT: 'INCORRECT'
};


function Quiz({ navigation, deck, title }) {

  const [currentView, setCurrentView] = useState(view.QUESTION);
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const [questionsCount, setQuestionCount] = useState(deck.questions.length)
  const [answered, setAnswered] = useState(Array(deck.questions.length).fill(0))
  const [page, setPage] = useState(0)

  const setNotification = () => {
    clearLocalNotification().then(
      setLocalNotification
    ) 

  }

  useEffect(() => { 
    if(questionsCount === correct + incorrect) { 
      setCurrentView(view.RESULT);
      setNotification()

    }else if(correct + incorrect != 0){
      bodyRef.setPage(page + 1)
      setCurrentView(view.QUESTION)
    }
  }, [correct, incorrect]);

  const handleAnswer = (submission, page) => {
    setPage(page) 
    if(submission === answer.CORRECT){
      setCorrect(correct + 1);
    } else {
      setIncorrect(incorrect + 1);
    }
    setAnswered(answered.map((val, i) => (page === i ? 1 : val)))
    
    if(questionsCount === correct + incorrect) {
      currentView(view.RESULT)
    }else {
      bodyRef.setPage(page + 1)
      setCurrentView(view.QUESTION)
    }
  }

  const handleQuit = () => {
    handleReset();
    navigation.navigate('deckDetails');
  } 

  const handleReset = () => {
    setCurrentView(view.QUESTION);
    setCorrect(0)
    setIncorrect(0)
    setAnswered(Array(questionsCount).fill(0))
  }

  const { questions } = deck;

  if (!questions.length) {
    return (
      <View style={styles.container }>
        <Text style={[styles.count, { textAlign: 'center' }]}>
          You cannot take a quiz because there are no cards in the deck.
            </Text>
        <Text style={[styles.count, { textAlign: 'center' }]}>
          Please add some cards and try again.
            </Text>
      </View>
    )
  }
  const percent = ((correct / questionsCount) * 100).toFixed(0);
  const resultColor = percent >= 50 ? colors.green : colors.red
  const isPassed = percent >= 50 ? true : false

  let bodyRef = useRef();

  return (
    <View style={styles.container}>
      <SafeAreaView>
      {
        currentView === view.RESULT ? 
        <View> 
          
          <View style={{alignItems: 'center'}}>
            <FontAwesome5 name={ isPassed ? "smile" : "meh"} size={50} color={resultColor} />
            <Text style={[styles.heading, {marginBottom: 10}]}>
              Quiz Complete
            </Text>
            <Text style={[styles.mutedText, {marginBottom: 10}]}>
              {correct} / {questionsCount} correct answers
            </Text>
            <Text>
              {percent}%
            </Text>
            
          </View>
          
          <View style={styles.buttonView}>
            <TouchableOpacity 
              style={[styles.quizButton, { backgroundColor: colors.black}]}
              onPress={ handleReset }
            >
              <Text 
                style={[styles.text, { color: "white" }]} 
              >Restart Quiz</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.quizButton, { backgroundColor: colors.red}]}
              onPress={ handleQuit }
            >
              <Text   
                style={[styles.text, { color: "white" }]} 
              >Back to Deck</Text>
            </TouchableOpacity>
          </View>
        </View>
        :
        <KeyboardAvoidingView behavior="padding">
          <ViewPager style={styles.viewPager} initialPage={0} ref={(viewPage) => {bodyRef = viewPage}}>
            { 
              questions.map((question, index) => (
                <View style={styles.page} key={index}>
                  <Text>{index + 1} / { questions.length }</Text>
                  <View style={styles.questionCard}>
                    <Text style={styles.heading}>
                      {currentView === view.QUESTION ? 'Question' : 'Answer'}
                    </Text>
                    <View>
                      <Text style={styles.question}>
                        {
                          currentView === view.QUESTION ? 
                          question.question : 
                          question.answer
                        }  
                      </Text>
                    </View>
                  </View>
                  <View style={{marginTop: 20}}>
                    {
                      currentView === view.QUESTION ? (
                        <TouchableOpacity
                          onPress={() => setCurrentView(view.ANSWER) }
                        >
                          <Text
                            style={[styles.text, { color: "red" }]} 
                          >Show Answer</Text>
                        </TouchableOpacity>
        
                      ) : (
                        <TouchableOpacity 
                          onPress={()=> setCurrentView(view.QUESTION) }
                        >
                          
                          <Text 
                            style={[styles.text, { color: "red" }]} 
                          >Hide Answer</Text>
                        </TouchableOpacity>
                      )
                    }
                  </View>
                  
                  <View style={styles.buttonView}>
                    <TouchableOpacity 
                      onPress={()=> handleAnswer(answer.CORRECT, index) }
                      disabled={answered[index] === 1}
                      style={[styles.quizButton, { backgroundColor: colors.green}]}
                    >
                      
                      <Text 
                       style={styles.text}
                      >Correct</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={()=> handleAnswer(answer.INCORRECT, index) }
                      disabled={answered[index] === 1}
                      style={[styles.quizButton, { backgroundColor: colors.red}]}
                    >
                      
                      <Text 
                       style={styles.text}
                      >Incorrect</Text>
                    </TouchableOpacity>
                  </View>

                </View>
              ))
            }
          </ViewPager>

        </KeyboardAvoidingView>
      }
        

      </SafeAreaView>
    </View>
  );
}

const mapStateToProps = (state, { route }) => {
  const {id} = route.params
  const deck = state[id];
  return {
    deck
  }

}

export default connect(
  mapStateToProps,
)(Quiz)

