import { combineReducers } from 'redux';
import appReducer from './appReducer';
import tickerReducer from './tickerReducer';
import orderBookReducer from './orderBookReducer';

export default combineReducers({
  app: appReducer,
  ticker: tickerReducer,
  orderBook: orderBookReducer,
});
