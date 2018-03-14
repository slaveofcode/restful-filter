"use strict";

const _ = require("lodash");
const utils = require("./utils");

const paginate = (config, queryString) => {
  const mappedQueryStrings = !config.case_sensitive
    ? utils.lowercasedQuerystring(queryString)
    : queryString;

  const pageName = !config.case_sensitive
    ? config.page_param_name.toLowerCase()
    : config.page_param_name;
  const limit = !config.case_sensitive
    ? config.limit_param_name.toLowerCase()
    : config.limit_param_name;

  const pageNumber = _.parseInt(_.get(mappedQueryStrings, pageName, 1));
  let limitNumber = _.get(mappedQueryStrings, limit, config.per_page);

  if (_.parseInt(limitNumber) > _.parseInt(config.max_count_per_page)) {
    limitNumber = _.parseInt(config.max_count_per_page);
  }

  const offsetNumber = pageNumber === 1 ? 0 : (pageNumber - 1) * limitNumber;

  return {
    offset: parseInt(offsetNumber),
    limit: parseInt(limitNumber)
  };
};

module.exports = paginate;
