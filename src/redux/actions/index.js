import { getInitialData } from '../../utils/dataHandler';

export const ADD_DECK = 'ADD_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_DECK = 'DELETE_DECK'
export const RECEIVE_DECKS = 'RECEIVE_DECKS';

export function addDeck(deck) {
  return {
    type: ADD_DECK,
    title: deck.title,
    id: deck.id
  };
}

export function receiveDecks(decks) {
  return {
    type: RECEIVE_DECKS,
    decks
  };
}


export function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    deckId: id
  };
}

export function addCardDeck(deckCard, card) {
  return {
    type: ADD_CARD,
    deckCard,
    card
  };
}

export const handleInitialData = () => {
  return async dispatch => {
    const data  = await getInitialData()
    if(data){
      return dispatch(receiveDecks(data))
    }
  };
}