import { SubscriptionsResponseChildren } from '@/types/subscriptions';
import { LOCATION_CHANGE } from 'connected-next-router';
import { getCookie } from 'cookies-next';
import { AnyAction } from 'redux';
import { put, take, select, fork, takeEvery, call, apply } from 'redux-saga/effects';
('reduxSaga/reducers/me/selectors');
import { initialSubscriptionsState } from 'reduxSaga/reducers/subscriptions';
import {
  LOAD_SUBSCRIPTIONS,
  LOAD_SUBSCRIPTIONS_FAILURE,
  LOAD_SUBSCRIPTIONS_SUCCESS,
} from 'reduxSaga/reducers/subscriptions/actions';
import { selectSubscriptions } from 'reduxSaga/reducers/subscriptions/selectors';

const token = getCookie(`token`);

export function* loadSubscriptions() {
  const response: Response = yield call(fetch, 'https://oauth.reddit.com/subreddits/mine/subscriber?raw_json=1', {
    method: 'get',
    headers: { Authorization: `bearer ${token}` },
  });
  if (response.ok) {
    const data: SubscriptionsResponseChildren[] = yield apply(response, response.json, []);
    yield put({
      type: LOAD_SUBSCRIPTIONS_SUCCESS,
      payload: data,
    });
  } else {
    yield put({
      type: LOAD_SUBSCRIPTIONS_FAILURE,
      payload: response.status,
    });
  }
}

export function* loadSubscriptionsOnRouterEnter() {
  while (true) {
    const action: AnyAction = yield take(LOCATION_CHANGE);

    const state: typeof initialSubscriptionsState = yield select(selectSubscriptions);

    if (state.noData) {
      yield put({
        type: LOAD_SUBSCRIPTIONS,
      });
    }
  }
}

export default function* subscriptionsSaga() {
  yield fork(loadSubscriptionsOnRouterEnter);
  yield takeEvery(LOAD_SUBSCRIPTIONS, loadSubscriptions);
}
