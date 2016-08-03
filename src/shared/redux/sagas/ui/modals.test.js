import { expect } from 'chai';
import { takeLatest } from 'redux-saga';
import { call, take, fork, put } from 'redux-saga/effects';

import * as sagas from './modals';
import * as authActions from '../../actions/auth';
import * as types from '../../actions/ui/modals';

const closeModalsAction = {
  type: types.CLOSE_MODALS
};

describe('Sagas::watchModals', () => {
  let iterator;
  let actualYield;
  let expectedYield;
  before(() => {
    iterator = sagas.watchModals();
  });

  it('starts closeModalsSaga', () => {
    expectedYield = [
      call(takeLatest, types.CLOSE_MODALS, sagas.closeModalsSaga)
    ];
    actualYield = iterator.next().value;
    expect(actualYield).to.eql(expectedYield);
  });

  describe('Saga::closeModalsSaga', () => {
    before(() => {
      iterator = sagas.closeModalsSaga(closeModalsAction);
    });

    it('puts clearErrors action to dispatch', () => {
      expectedYield = put(authActions.clearErrors());
      actualYield = iterator.next().value;
      expect(actualYield).to.eql(expectedYield);
    });
  });
});
