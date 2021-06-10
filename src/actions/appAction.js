import { RESET_TICKER } from './tickerAction';
import { RESET_ORDER_BOOK } from './orderBookAction';

export const UPDATE_SYMBOL = 'UPDATE_SYMBOL';

export const updateSymbol = (payload) => (
  dispatch,
) => {
  dispatch({
    type: UPDATE_SYMBOL,
    payload,
  });

  dispatch({ type: RESET_TICKER });
  dispatch({ type: RESET_ORDER_BOOK });
};
