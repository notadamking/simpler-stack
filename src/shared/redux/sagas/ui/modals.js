import { takeLatest } from 'redux-saga';
import { take, put, call, fork } from 'redux-saga/effects';

import * as formActions from '../../actions/ui/forms';
import * as types from '../../actions/ui/modals';

export function *closeModalsSaga() {
  yield put(formActions.clearErrors());
  document.querySelector('.dimmed').classList.remove('dimmed');
}

export function *watchModals() {
  yield [
    call(takeLatest, types.CLOSE_MODALS, closeModalsSaga)
  ];
}
