import { SubscriptionsResponse, SubscriptionsResponseChildren } from '@/types/subscriptions';
import { LOAD_SUBSCRIPTIONS, LOAD_SUBSCRIPTIONS_FAILURE, LOAD_SUBSCRIPTIONS_SUCCESS } from './actions';

export interface SubscriptionsState {
  noData: boolean;
  isLoading: boolean;
  isError: Error | null;
  data: SubscriptionsResponseChildren[] | [];
}

export interface SubscriptionsAction {
  type: `LOAD_SUBSCRIPTIONS` | `LOAD_SUBSCRIPTIONS_FAILURE` | `LOAD_SUBSCRIPTIONS_SUCCESS`;
  payload: SubscriptionsResponse;
}

export const initialSubscriptionsState: SubscriptionsState = {
  noData: true,
  isLoading: false,
  isError: null,
  data: [],
};

export default function subscriptionsReducer(state = initialSubscriptionsState, action: SubscriptionsAction) {
  switch (action.type) {
    case LOAD_SUBSCRIPTIONS: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOAD_SUBSCRIPTIONS_SUCCESS: {
      return {
        ...state,
        noData: false,
        isLoading: false,
        data: action.payload.data.children,
      };
    }

    case LOAD_SUBSCRIPTIONS_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isError: action.payload,
      };
    }

    default:
      return state;
  }
}
