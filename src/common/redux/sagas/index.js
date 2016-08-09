import { fork } from 'redux-saga/effects';

import { watchAuth } from './auth';
import { watchModals } from './ui/modals';

export default function *rootSaga() {
  yield [
    fork(watchAuth),
    fork(watchModals)
  ];
}
