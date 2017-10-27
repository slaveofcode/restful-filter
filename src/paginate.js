'use strict';

const _ = require('lodash');
const utils = require('./utils');

const paginate = (config, queryString) => {
  const mappedQueryStrings = !config.case_sensitive
    ? utils.lowercasedQuerystring(queryString)
    : queryString;

  const pageName = !config.case_sensitive
    ? config.pageParamName.toLowerCase()
    : config.pageParamName;
  const limit = !config.case_sensitive
    ? config.limitParamName.toLowerCase()
    : config.limitParamName;

  const pageNumber = _.parseInt(_.get(mappedQueryStrings, pageName, 1));
  const limitNumber = _.get(mappedQueryStrings, limit, config.perPage);

  if (_.parseInt(limitNumber) > _.parseInt(config.maxCountPerPage)) {
    limitNumber = _.parseInt(config.maxCountPerPage);
  }

  const offsetNumber = pageNumber === 1 ? 0 : (pageNumber - 1) * limitNumber;

  return {
    offset: offsetNumber,
    limit: limitNumber,
  };
};

module.exports = paginate;
