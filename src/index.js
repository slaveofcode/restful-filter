'use strict';

const _ = require('lodash');

const parse = (config, queryString, allowedKeys = null) => {
  return {
    filter: require('./filter')(config, queryString, allowedKeys),
    paginate: require('./paginate')(config, queryString),
    order: require('./order')(config, queryString, allowedKeys),
  };
};

module.exports = (config = {}) => {
  const defaultConfig = {
    // All parser setting
    case_sensitive: false,
    // Paginate settings
    pageParamName: 'page',
    limitParamName: 'count',
    perPage: 20,
    maxCountPerPage: 100,
    // Order setting
    orderParamName: 'order_by',
  };

  const compiledConfig = Object.assign({}, defaultConfig, config);

  return {
    parse: _.curry(parse)(compiledConfig),
  };
};
