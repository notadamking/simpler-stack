import { fork } from 'redux-saga/effects';
import { watchAuth } from './modules/auth';

export default function *rootSaga() {
  yield [
    fork(watchAuth)
  ];
}
