import { routerReducer } from 'connected-next-router';
import { Action, combineReducers } from 'redux';
import meReducer from './me';
import subscriptionsReducer from './subscriptions';

const initial = {};

export function appReducer(state = initial, action: Action<any>) {
  return state;
}

const rootReducer = combineReducers({
  router: routerReducer,
  me: meReducer,
  subscriptions: subscriptionsReducer,
});

export default rootReducer;
