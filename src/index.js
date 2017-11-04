"use strict";

const _ = require("lodash");

const parse = (config, queryString, allowedKeys = null) => {
  return {
    filter: require("./filter")(config, queryString, allowedKeys),
    paginate: require("./paginate")(config, queryString),
    order: require("./order")(config, queryString, allowedKeys)
  };
};

module.exports = (config = {}) => {
  const defaultConfig = {
    // All parser setting
    case_sensitive: false,
    // Paginate settings
    page_param_name: "page",
    limit_param_name: "count",
    per_page: 20,
    max_count_per_page: 100,
    // Order setting
    order_param_name: "order_by"
  };

  const compiledConfig = Object.assign({}, defaultConfig, config);

  return {
    parse: _.curry(parse)(compiledConfig)
  };
};
