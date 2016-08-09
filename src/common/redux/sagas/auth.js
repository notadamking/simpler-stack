import { takeLatest } from 'redux-saga';
import { take, put, call, fork } from 'redux-saga/effects';
import { currentUserQuery, loginUserQuery, signupUserQuery } from '../../utils/queries';
import * as actions from '../actions/auth';
import * as modalActions from '../actions/ui/modals';
import * as formActions from '../actions/ui/forms';
import * as types from '../actions/auth';

export function *checkTokenSaga(action) {
  const { client } = action.payload;
  try {
    const { data: { currentUser } } = yield call(client.query, currentUserQuery);
    if (currentUser) {
      yield put(actions.tokenSuccess({ user: currentUser }));
    } else {
      throw new Error('Invalid auth token.');
    }
  } catch (error) {
    yield put(actions.tokenFailure());
  }
}

export function *loginSaga(action) {
  const { client, email, password } = action.payload;
  try {
    const { data: { loginUser } } = yield call(client.query, loginUserQuery({ email, password }));
    yield put(actions.loginSuccess({ user: loginUser }));
    yield put(modalActions.closeModals());
  } catch (err) {
    const [ error ] = err.graphQLErrors;
    yield put(actions.loginFailure());
    yield put(formActions.loginError({ error }));
  }
}

export function *signupSaga(action) {
  const { client, name, email, password } = action.payload;
  try {
    const { data: { createUser }, errors } = yield call(client.mutate, signupUserQuery({ name, email, password }));
    if (errors) {
      const [ error ] = errors;
      yield put(actions.signupFailure());
      yield put(formActions.signupError({ error }));
    } else {
      yield put(actions.signupSuccess({ user: createUser }));
      yield put(modalActions.closeModals());
    }
  } catch (err) {
    const [ error ] = err.graphQLErrors;
    yield put(actions.signupFailure());
    yield put(formActions.signupError({ error }));
  }
}

export function *watchAuth() {
  yield [
    call(takeLatest, types.CHECK_TOKEN_REQUEST, checkTokenSaga),
    call(takeLatest, types.LOGIN_REQUEST, loginSaga),
    call(takeLatest, types.SIGNUP_REQUEST, signupSaga),
  ];
}
