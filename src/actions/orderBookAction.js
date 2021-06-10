export const UPDATE_ORDER_BOOK = 'UPDATE_ORDER_BOOK';
export const RESET_ORDER_BOOK = 'RESET_ORDER_BOOK';

export const updateOrderBook = (payload) => (
  dispatch,
) => {
  dispatch({
    type: UPDATE_ORDER_BOOK,
    payload,
  });
};
