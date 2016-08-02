import { takeEvery, takeLatest } from 'redux-saga';
import { take, put, call, fork } from 'redux-saga/effects';
import { head, isEmpty } from 'lodash';
import { currentUserQuery, loginUserQuery, signupUserQuery } from '../../utils/queries';
import * as actions from '../actions/auth';
import * as types from '../actions/auth';

export function *checkTokenSaga(action) {
  if (!__CLIENT__) { return; }
  const { client } = action.payload;

  try {
    const { data: { currentUser } } = yield call(client.query, currentUserQuery());

    if (!isEmpty(currentUser)) {
      yield put(actions.loginSuccess(currentUser));
    } else {
      yield put(actions.loginFailure());
    }
  } catch (error) {
    yield put(actions.loginFailure(error));
  }
}

export function *loginSaga(action) {
  const { client, email, password } = action.payload;

  try {
    const { data: { loginUser: { user, authToken } } } = yield call(client.query, loginUserQuery(email, password));

    yield put(actions.loginSuccess(user, authToken));
    yield put(actions.closeModal());
  } catch (error) {
    yield put(actions.loginFailure(head(error.graphQLErrors).message));
  }
}

export function *signupSaga(action) {
  const { client, name, email, password } = action.payload;

  try {
    const { data: { createUser }, errors } = yield call(client.mutate, signupUserQuery(name, email, password));

    if (!isEmpty(errors)) {
      yield put(actions.signupFailure(head(errors).message));
    } else {
      const { user, authToken } = createUser;

      yield put(actions.signupSuccess(user, authToken));
      yield put(actions.closeModal());
    }
  } catch (error) {
    console.log('e: ', error);
    yield put(actions.signupFailure(head(error.graphQLErrors).message));
  }
}

export function *closeModalSaga() {
  yield put(actions.clearErrors());
  $('.dimmed').removeClass('dimmed');
}

export function *watchAuth() {
  yield [
    call(takeLatest, types.CHECK_TOKEN_REQUEST, checkTokenSaga),
    call(takeLatest, types.LOGIN_REQUEST, loginSaga),
    call(takeLatest, types.SIGNUP_REQUEST, signupSaga),
    call(takeEvery, types.CLOSE_MODAL, closeModalSaga)
  ];
}
