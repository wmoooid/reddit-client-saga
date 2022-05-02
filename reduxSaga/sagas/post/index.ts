import { CommentsResponse } from '@/types/comments';
import { LOCATION_CHANGE } from 'connected-next-router';
import { getCookie } from 'cookies-next';
import { AnyAction } from 'redux';
import { apply, call, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { initialPostState } from 'reduxSaga/reducers/post';
import { LOAD_POST, LOAD_POST_FAILURE, LOAD_POST_SUCCESS } from 'reduxSaga/reducers/post/actions';
import { selectPost } from 'reduxSaga/reducers/post/selectors';

const token = getCookie(`token`);

export function* loadPost() {
  const response: Response = yield call(fetch, 'https://oauth.reddit.com/api/v1/me?raw_json=1', {
    method: 'get',
    headers: { Authorization: `bearer ${token}` },
  });
  if (response.ok) {
    const data: CommentsResponse = yield apply(response, response.json, []);
    yield put({
      type: LOAD_POST_SUCCESS,
      payload: data,
    });
  } else {
    yield put({
      type: LOAD_POST_FAILURE,
      payload: response.status,
    });
  }
}

export function* loadPostOnRouterEnter() {
  while (true) {
    const action: AnyAction = yield take(LOCATION_CHANGE);

    const state: typeof initialPostState = yield select(selectPost);

    yield put({
      type: LOAD_POST,
    });
  }
}

export default function* postSaga() {
  yield fork(loadPostOnRouterEnter);
  yield takeEvery(LOAD_POST, loadPost);
}
