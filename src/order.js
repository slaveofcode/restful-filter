'use strict';

const defineOrder = (config, queryString, allowedKeys) => {
  const mappedQueryStrings = !config.case_sensitive
    ? utils.lowercasedQuerystring(queryString)
    : queryString;

  const orderName = !config.case_sensitive
    ? config.orderParamName.toLowerCase()
    : config.orderParamName;

  // split the value of order, in case doing order with multi columns
  // check every value is in allowed keys with case sensitive & case insensitive
  // defining the order direction
  // return the sql order object
};

module.exports = defineOrder;
