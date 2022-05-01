import { routerReducer } from 'connected-next-router';
import { Action, combineReducers } from 'redux';
import meReducer from './me';

const initial = {};

export function appReducer(state = initial, action: Action<any>) {
  return state;
}

const rootReducer = combineReducers({
  router: routerReducer,
  me: meReducer,
});

export default rootReducer;
