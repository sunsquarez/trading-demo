import { UPDATE_SYMBOL } from '../actions/appAction';

const initialState = {
  symbol: 'tBTCUSD',
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_SYMBOL:
      return {
        ...initialState,
        symbol: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
