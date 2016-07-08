export const prepareQuery = query => {
  // compress
  return JSON.stringify(query.replace(/\s/g, ''));
};
