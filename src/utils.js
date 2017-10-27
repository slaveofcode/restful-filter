'use strict';

const _ = require('lodash');

const lowercasedQuerystring = queryString => {
  const mappedQueryStrings = Object.assign({}, queryString);
  _.entries(queryString).forEach(([key, value]) => {
    // remove old key
    delete mappedQueryStrings[key];
    mappedQueryStrings[key.toLowerCase()] = value;
  });
  return mappedQueryStrings;
};

module.exports = {
  lowercasedQuerystring,
};
