import { expect } from 'chai';
import { takeEvery, takeLatest } from 'redux-saga';
import { call, take, fork, put } from 'redux-saga/effects';

import ApolloClient from '../../utils/ApolloClient';
import * as sagas from './auth';
import * as actions from '../actions/auth';
import * as types from '../actions/auth';
import * as queries from '../../utils/queries';

const client = ApolloClient();

const fakeUser = {
  name: 'fake user',
  email: 'fake@email.com',
  password: 'password'
};
const checkTokenAction = {
  type: types.CHECK_TOKEN_REQUEST,
  payload: { client }
};
const loginAction = {
  type: types.LOGIN_REQUEST,
  payload: { client, ...fakeUser }
};
const signupAction = {
  type: types.SIGNUP_REQUEST,
  payload: { client, ...fakeUser }
};
const closeModalAction = {
  type: types.CLOSE_MODAL
};

describe('Sagas::watchAuth', () => {
  let iterator;
  let actualYield;
  let expectedYield;
  before(() => {
    iterator = sagas.watchAuth();
  });

  it('starts checkTokenSaga, loginSaga, signupSaga, and closeModalSaga', () => {
    expectedYield = [
      call(takeLatest, types.CHECK_TOKEN_REQUEST, sagas.checkTokenSaga),
      call(takeLatest, types.LOGIN_REQUEST, sagas.loginSaga),
      call(takeLatest, types.SIGNUP_REQUEST, sagas.signupSaga),
      call(takeEvery, types.CLOSE_MODAL, sagas.closeModalSaga)
    ];
    actualYield = iterator.next().value;
    expect(actualYield).to.eql(expectedYield);
  });

  describe('Saga::checkTokenSaga', () => {
    before(() => {
      iterator = sagas.checkTokenSaga(checkTokenAction);
    });

    it('calls getCurrentUser query', () => {
      expectedYield = call(checkTokenAction.payload.client.query, queries.currentUserQuery());
      actualYield = iterator.next().value;
      expect(actualYield).to.eql(expectedYield);
    });

    it('then puts LOGIN_FAILURE action to dispatch', () => {
      actualYield = iterator.next().value;
      expect(actualYield).to.have.deep.property('PUT.action.type', types.LOGIN_FAILURE);
    });
  });

  describe('Saga::signupUserSaga', () => {
    before(() => {
      iterator = sagas.signupSaga(signupAction);
    });

    it('calls signupUser mutation', () => {
      expectedYield = call(signupAction.payload.client.mutate, queries.signupUserQuery(fakeUser));
      actualYield = iterator.next({ user: fakeUser }).value;
      expect(actualYield).to.eql(expectedYield);
    });

    it('then puts SIGNUP_SUCCESS action to dispatch', () => {
      actualYield = iterator.next().value;
      expect(actualYield).to.have.deep.property('PUT.action.type', types.SIGNUP_SUCCESS);
    });

    it('then puts CLOSE_MODAL action to dispatch', () => {
      actualYield = iterator.next().value;
      expect(actualYield).to.have.deep.property('PUT.action.type', types.CLOSE_MODAL);
    });
  });

  describe('Saga::loginUserSaga', () => {
    before(() => {
      iterator = sagas.loginSaga(loginAction);
    });

    it('calls loginUser query', () => {
      expectedYield = call(loginAction.payload.client.query, queries.loginUserQuery(fakeUser));
      actualYield = iterator.next().value;
      expect(actualYield).to.eql(expectedYield);
    });

    it('then puts loginSuccess action to dispatch', () => {
      actualYield = iterator.next({ user: fakeUser }).value;
      expect(actualYield).to.have.deep.property('PUT.action.type', types.LOGIN_SUCCESS);
    });
  });
});
