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

export const addDeckAS = async (data) => {
  try {
    const {title, id} = data
    await AsyncStorage.mergeItem(
      DECKS_DATA,
      JSON.stringify({
        [id]: {
          id,
          title,
          questions: [],
        }
      })
    )
    
  } catch (error){
    console.log(error)
  }
}

export const addCardAS = async (deckData, card) => {
  try {

    const deck = await getDeck(deckData.id);

    await AsyncStorage.mergeItem(
      DECKS_DATA,
      JSON.stringify({
        [deckData.id]: {
          questions: [...deck.questions].concat(card)
        }
      })
    );
    
  } catch (error){
    console.log(error)
  }
}

export async function deleteDeckAS(key) {
  try {
    const results = await AsyncStorage.getItem(DECKS_DATA);
    const data = JSON.parse(results);
    data[key] = undefined;
    delete data[key];
    AsyncStorage.setItem(DECKS_DATA, JSON.stringify(data));
  } catch (err) {
    console.log(err);
  }
}