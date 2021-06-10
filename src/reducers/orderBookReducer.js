import { uuid } from 'uuidv4';
import { UPDATE_ORDER_BOOK, RESET_ORDER_BOOK } from '../actions/orderBookAction';

const initialState = {
  precision: 'P0',
  data: [],
};

const orderBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER_BOOK:
      return {
        data: [
          [
            ...action.payload,
            uuid(),
          ],
          ...state.data,
        ],
      };
    case RESET_ORDER_BOOK:
      return initialState;
    default:
      return state;
  }
};

export default orderBookReducer;
