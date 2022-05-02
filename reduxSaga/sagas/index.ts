import { all, spawn } from 'redux-saga/effects';
import meSaga from './me';
import subscriptionsSaga from './subscriptions';

export default function* rootSaga() {
  const sagas = [meSaga, subscriptionsSaga];

  yield all(sagas.map((s) => spawn(s)));
}
