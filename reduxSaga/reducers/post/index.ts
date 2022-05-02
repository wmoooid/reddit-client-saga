import { CommentsResponse, CommentsResponseCommentsDataType, CommentsResponsePostInfoDataType } from '@/types/comments';
import { LOAD_POST, LOAD_POST_FAILURE, LOAD_POST_SUCCESS } from './actions';

export interface PostState {
  isLoading: boolean;
  isError: Error | null;
  data: {
    post: CommentsResponsePostInfoDataType | {};
    comments: CommentsResponseCommentsDataType[] | [];
  };
}

export interface PostAction {
  type: `LOAD_POST` | `LOAD_POST_FAILURE` | `LOAD_POST_SUCCESS`;
  payload: CommentsResponse;
}

export const initialPostState: PostState = {
  isLoading: false,
  isError: null,
  data: {
    post: {},
    comments: [],
  },
};

export default function postReducer(state = initialPostState, action: PostAction) {
  switch (action.type) {
    case LOAD_POST: {
      return {
        ...state,
        isLoading: true,
      };
    }

    case LOAD_POST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        data: {
          post: action.payload[0],
          comments: action.payload[1],
        },
      };
    }

    case LOAD_POST_FAILURE: {
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
