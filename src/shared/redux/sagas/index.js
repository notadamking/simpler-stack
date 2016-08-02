import { fork } from 'redux-saga/effects';

import { watchAuth } from './auth';

export default function *rootSaga() {
  yield [
    fork(watchAuth)
  ];
}
