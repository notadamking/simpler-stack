import { expect } from 'chai';
import { fork } from 'redux-saga/effects';

import rootSaga from './';
import * as authSagas from './auth';

describe('Saga::rootSaga', () => {
  let iterator;
  let expectedYield;
  let actualYield;
  beforeEach(() => {
    iterator = rootSaga();
  });
  it('starts the watchAuth saga', () => {
    expectedYield = fork(authSagas.watchAuth);
    actualYield = iterator.next().value;
    expect(actualYield).to.contain(expectedYield);
  });
});
