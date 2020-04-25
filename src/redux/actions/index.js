import { getInitialData } from '../../utils/dataHandler';

export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}


export function removeDeck(id) {
  return {
    type: REMOVE_DECK,
    id
  };
}

export function addCardDeck(cardId, card) {
  console.log(cardId, card)
  return {
    type: ADD_CARD,
    cardId,
    card
  };
}

export const handleInitialData = () => {
  return async dispatch => {
    const data  = await getInitialData()
    if(data){
      console.log(data);
      return dispatch(receiveDecks(data))
    }
  };
}