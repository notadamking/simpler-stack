import { getUsersQuery } from '../graphql/queries';

export const FETCH = 'green-stack/users/fetch';
export const FETCH_SUCCESS = 'green-stack/users/fetch_success';
export const FETCH_FAIL = 'green-stack/users/fetch_fail';

const initialState = {
  fetched: false,
  data: {},
  error: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH:
      return {
        ...state,
        fetching: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        fetched: true,
        fetching: false,
        data: action.result.data,
        error: null
      };
    case FETCH_FAIL:
      return {
        ...state,
        fetched: false,
        fetching: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isFetched(globalState) {
  return globalState.users && globalState.users.fetched;
}

export function fetch() {
  return {
    types: [ FETCH, FETCH_SUCCESS, FETCH_FAIL ],
    promise: (client) => client.post('/graphql', {
      data: getUsersQuery
    })
  };
}
