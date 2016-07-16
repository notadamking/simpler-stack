import fetch from 'isomorphic-fetch';
import { fetchGraphQL } from '../../utils/fetching';
import { getUsersQuery } from '../graphql/queries';

export const FETCH_REQUEST = 'users/fetch_request';
export const FETCH_SUCCESS = 'users/fetch_success';
export const FETCH_ERROR = 'users/fetch_error';

const initialState = {
  fetched: false,
  users: [],
  error: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        fetched: true,
        fetching: false,
        users: action.users,
        error: null
      };
    case FETCH_ERROR:
      return {
        ...state,
        fetched: false,
        fetching: false,
        users: null,
        error: action.error
      };
    default:
      return state;
  }
}

export function fetchUsers() {
  return dispatch => {
    dispatch({ type: FETCH_REQUEST });
    return new Promise(async (resolve, reject) => {
      const { error, data } = await fetchGraphQL({ query: getUsersQuery });
      if (error) {
        dispatch({ type: FETCH_ERROR, error });
        reject(error);
      } else {
        const { users } = data;
        dispatch({ type: FETCH_SUCCESS, users });
        resolve();
      }
    });
  };
}
