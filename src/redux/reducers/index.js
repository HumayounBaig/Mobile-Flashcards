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
      const { title } = action;
      return {
        ...state,
        [title]: {
          title,
          questions: []
        }
      };

    case DELETE_DECK:
      const { id } = action;
      // return ({ [id]: value, ...remainingDecks } = state);
      const { [id]: value, ...remainingDecks } = state;
      console.log(remainingDecks);
      return remainingDecks;
    
    case ADD_CARD:
      const { cardId,card } = action;
      console.log(action)
      return {
        ...state,
        [cardId]: {
          ...state[cardId],
          questions: [...state[cardId].questions].concat(card)
        }
      };
    default:
      return state;
  }
}