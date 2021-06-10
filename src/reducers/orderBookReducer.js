import { uuid } from 'uuidv4';
import {
  UPDATE_ORDER_BOOK,
  UPDATE_PRECISION,
  RESET_ORDER_BOOK,
} from '../actions/orderBookAction';

const initialState = {
  precision: 'P0',
  data: [],
};

const orderBookReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ORDER_BOOK:
      return {
        ...state,
        data: [
          [
            ...action.payload,
            uuid(),
          ],
          ...state.data,
        ],
      };
    case UPDATE_PRECISION:
      return {
        ...state,
        precision: action.payload,
        data: [],
      };
    case RESET_ORDER_BOOK:
      return initialState;
    default:
      return state;
  }
};

export default orderBookReducer;
