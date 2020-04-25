import { AsyncStorage } from 'react-native'
import { decks } from '../utils/_DATA'

const DECKS_DATA = 'DECKS_DATA'

export const getInitialData = async () => {
  try {
    // await AsyncStorage.clear()
    const data = await AsyncStorage.getItem(DECKS_DATA);
    
    if(data){ 
      const decksData = JSON.parse(data)
      
      return decksData;
    }else{
      const decksData = await AsyncStorage.setItem(
        DECKS_DATA,
        JSON.stringify(decks)
      )
      return decksData
    } 
  } catch (error){
    console.log(error)
  }
}

export const getDeck = async(id) => {
  try {
    const decks = await AsyncStorage.getItem(DECKS_DATA);

    return JSON.parse(decks)[id];
  } catch (err) {
    console.log(err);
  }
}

export const addDeck = async (title) => {
  try {
    await AsyncStorage.mergeItem(
      DECKS_DATA,
      JSON.stringify({
        [title]: {
          title,
          questions: [],
        }
      })
    )
    
  } catch (error){
    console.log(error)
  }
}

export const addCard = async (title, card) => {
  try {
    const deck = await getDeck(title);

    await AsyncStorage.mergeItem(
      DECKS_DATA,
      JSON.stringify({
        [title]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
    
  } catch (error){
    console.log(error)
  }
}

const _retrieveData = async () => {
  try {
    const value = await AsyncStorage.getItem('TASKS');
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
  } catch (error) {
    // Error retrieving data
  }
};