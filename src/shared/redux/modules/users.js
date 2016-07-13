import { getUsersQuery } from '../graphql/queries';

export const FETCH = 'graphql-request:green-stack/users/fetch';
export const FETCH_RESPONSE = 'graphql-response:green-stack/users/fetch';

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
    case FETCH_RESPONSE:
      return {
        ...state,
        fetched: true,
        fetching: false,
        data: action.payload.data,
        error: action.payload.error
      };
    default:
      return state;
  }
}

export function fetchUsers() {
  return {
    type: FETCH,
    payload: getUsersQuery
  };
}

export function isFetched(globalState) {
  return globalState.users && globalState.users.fetched;
}

export function fetchUsersIfNeeded(globalState) {
  if (!isFetched(globalState)) {
    fetchUsers();
  }
}
