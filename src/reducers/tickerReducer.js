import { UPDATE_TICKER, RESET_TICKER } from '../actions/tickerAction';

const initialState = {
  data: [],
};

const tickerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_TICKER:
      return {
        data: action.payload,
      };
    case RESET_TICKER:
      return initialState;
    default:
      return state;
  }
};

export default tickerReducer;
