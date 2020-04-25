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

export const addDeck = async (title) => {
  try {
    let deck = JSON.parse(await AsyncStorage.getItem(DECKS_DATA));
    deck.push({
        title,
        questions: [],
        id: Math.random().toString(36).substring(7)
      })

      console.log(deck)

    await AsyncStorage.setItem(
      DECKS_DATA, 
      JSON.stringify(deck)
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