import { prepareQuery } from './graphql';

const LOAD_ALL = 'green-stack/users/LOAD_ALL';
const LOAD_ALL_SUCCESS = 'green-stack/users/LOAD_ALL_SUCCESS';
const LOAD_ALL_FAIL = 'green-stack/users/LOAD_ALL_FAIL';

const initialState = {
  loaded: false
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD_ALL:
      return {
        ...state,
        loading: true
      };
    case LOAD_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result,
        error: null
      };
    case LOAD_ALL_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        data: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.users && globalState.users.loaded;
}

export const getUsersQuery = `
query {
  users {
    id,
    email
  }
}
`;

export function loadAll() {
  return {
    types: [LOAD_ALL, LOAD_ALL_SUCCESS, LOAD_ALL_FAIL],
    promise: (client) => client.post('/graphql', {
      data: prepareQuery(getUsersQuery)
    })
  };
}
