import { takeLatest } from 'redux-saga';
import { take, put, call, fork } from 'redux-saga/effects';

import * as authActions from '../../actions/auth';
import * as types from '../../actions/ui/modals';

export function *closeModalsSaga() {
  yield put(authActions.clearErrors());
  $('.dimmed').removeClass('dimmed');
}

export function *watchModals() {
  yield [
    call(takeLatest, types.CLOSE_MODALS, closeModalsSaga)
  ];
}
