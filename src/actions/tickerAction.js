export const UPDATE_TICKER = 'UPDATE_TICKER';
export const RESET_TICKER = 'RESET_TICKER';

export const updateTicker = (payload) => (
  dispatch,
) => {
  dispatch({
    type: UPDATE_TICKER,
    payload,
  });
};
