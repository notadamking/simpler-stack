import axios from 'axios';
import config from '../../../config';

export default function({ dispatch }) {
  return next => async action => {
    if (!action.type || action.type.substring(0, 16) !== 'graphql-request') {
      return next(action);
    }

    const query = action.payload.toString().replace(/\s/g, '');

    const response = await axios.get(`/api/graphql?query=${query}`);
    console.log('response: ', response.data);

    const newAction = {
      type: action.type.replace('graphql-request', 'graphql-response'),
      payload: response
    };
    dispatch(newAction);
  };
}
