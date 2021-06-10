export const UPDATE_ORDER_BOOK = 'UPDATE_ORDER_BOOK';
export const UPDATE_PRECISION = 'UPDATE_PRECISION';
export const RESET_ORDER_BOOK = 'RESET_ORDER_BOOK';

export const updateOrderBook = (payload) => (
  dispatch,
) => {
  dispatch({
    type: UPDATE_ORDER_BOOK,
    payload,
  });
};

export const updatePrecision = (payload) => (
  dispatch,
) => {
  dispatch({
    type: UPDATE_PRECISION,
    payload,
  });
};
