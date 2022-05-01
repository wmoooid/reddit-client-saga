import { all, spawn } from 'redux-saga/effects';
import meSaga from './me';

export default function* rootSaga() {
  const sagas = [meSaga];

  yield all(sagas.map((s) => spawn(s)));
}
