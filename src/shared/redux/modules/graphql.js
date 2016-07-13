import axios from 'axios';
import config from '../../../config';

export const GRAPHQL_REQUEST = 'green-stack/graphql-request';
export const GRAPHQL_RESPONSE = 'green-stack/graphql-response';

const initialState = {
  fetched: false,
  data: {}
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case GRAPHQL_REQUEST:
      return {
        ...state,
        fetching: true
      };
    case GRAPHQL_RESPONSE:
      return {
        ...state,
        fetched: true,
        fetching: true,
        data: action.data
      };
    default:
      return state;
  }
}

const prepareQuery = query => {
  // compress
  return JSON.stringify(query.replace(/\s/g, ''));
};

export function makeRequest(query) {
  const url = `http://${config.host}:${config.port}/api/graphql`;
  return async dispatch => {
    const { data } = await fetch(url)
  };
}
