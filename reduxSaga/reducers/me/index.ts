import { AnyAction } from 'redux';
import { LOAD_ME, LOAD_ME_FAILURE, LOAD_ME_SUCCESS } from './actions';

export const initialMeState = {
  isSignedIn: false,
  isLoading: false,
  isError: null,
  data: {},
};

export default function meReducer(state = initialMeState, action: AnyAction) {
  switch (action.type) {
    case LOAD_ME: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOAD_ME_SUCCESS: {
      return {
        ...state,
        isSignedIn: true,
        isLoading: false,
        data: action.payload,
      };
    }

    case LOAD_ME_FAILURE: {
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
