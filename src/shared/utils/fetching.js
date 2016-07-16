import fetch from 'isomorphic-fetch';
import config from '../../config';

export const getClientError = errors => {
  if (!errors) return null;
  const error = errors[0].message;
  return (error.indexOf('{"_error"') === -1) ? {_error: 'Server query error'} : JSON.parse(error);
};

export const prepareGraphQLParams = graphParams => {
  // compress
  graphParams.query = graphParams.query.replace(/\s/g, '');
  return JSON.stringify(graphParams);
};

export const fetchGraphQL = async (graphParams) => {
  const authToken = localStorage.getItem(config.authTokenName);
  const res = await fetch(`http://${config.host}:${config.port}/api/graphql`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: prepareGraphQLParams(graphParams)
  });
  const resJSON = await res.json();
  const { data, errors } = resJSON;
  return { data, error: getClientError(errors) };
};
