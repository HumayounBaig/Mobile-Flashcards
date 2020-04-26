import {
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK,
  RECEIVE_DECKS,
} from '../actions/index';

export default function decks(state = {}, action) {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks
      };

    case ADD_DECK:
      const { title, id } = action;
      return {
        ...state,
        [id]: {
          title,
          id,
          questions: []
        }
      };

    case DELETE_DECK:
      const { deckId } = action;
      const { [deckId]: value, ...remainingDecks } = state;
      return remainingDecks;
    
    case ADD_CARD:
      const { deckCard,card } = action;
      return {
        ...state,
        [deckCard.id]: {
          ...state[deckCard.id],
          questions: [...state[deckCard.id].questions].concat(card)
        }
      };
    default:
      return state;
  }
}