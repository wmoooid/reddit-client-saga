import { MeResponseType } from '@/types/me';
import { LOCATION_CHANGE } from 'connected-next-router';
import { getCookie } from 'cookies-next';
import { AnyAction } from 'redux';
import { apply, call, fork, put, select, take, takeEvery } from 'redux-saga/effects';
import { initialMeState } from 'reduxSaga/reducers/me';
import { LOAD_ME, LOAD_ME_FAILURE, LOAD_ME_SUCCESS } from 'reduxSaga/reducers/me/actions';
import { selectMe } from 'reduxSaga/reducers/me/selectors';

const token = getCookie(`token`);

export function* loadMe() {
  const response: Response = yield call(fetch, 'https://oauth.reddit.com/api/v1/me?raw_json=1', {
    method: 'get',
    headers: { Authorization: `bearer ${token}` },
  });
  if (response.ok) {
    const data: MeResponseType = yield apply(response, response.json, []);
    yield put({
      type: LOAD_ME_SUCCESS,
      payload: data,
    });
  } else {
    yield put({
      type: LOAD_ME_FAILURE,
      payload: response.status,
    });
  }
}

export function* loadMeOnRouterEnter() {
  while (true) {
    const action: AnyAction = yield take(LOCATION_CHANGE);

    const state: typeof initialMeState = yield select(selectMe);

    if (state.noLogin) {
      yield put({
        type: LOAD_ME,
      });
    }
  }
}

export default function* meSaga() {
  yield fork(loadMeOnRouterEnter);
  yield takeEvery(LOAD_ME, loadMe);
}
