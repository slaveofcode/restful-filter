'use strict';

const _ = require('lodash');

const OPERATORS = {
  __eq: {
    parser: require('./filters/equals'),
  },
  __ne: {
    parser: require('./filters/negate'),
  },
  __lte: {
    parser: require('./filters/lessthanequals'),
  },
  __gte: {
    parser: require('./filters/greaterthanequals'),
  },
  __lt: {
    parser: require('./filters/lessthan'),
  },
  __gt: {
    parser: require('./filters/greaterthan'),
  },
  __not: {
    parser: require('./filters/not'),
  },
  __in: {
    parser: require('./filters/in'),
  },
  __notIn: {
    parser: require('./filters/notin'),
  },
  __like: {
    parser: require('./filters/like'),
  },
  __iLike: {
    parser: require('./filters/ilike'),
  },
  __notLike: {
    parser: require('./filters/notlike'),
  },
  __notILike: {
    parser: require('./filters/notilike'),
  },
  __contains: {
    parser: require('./filters/contains'),
  },
  __between: {
    parser: require('./filters/between'),
  },
  __notBetween: {
    parser: require('./filters/notbetween'),
  },
};

const filtering = (config, queryString, allowedKeys) => {
  const filtered = [];
  _.entries(queryString).forEach(([key, value]) => {
    for (const [op, processor] of _.entries(OPERATORS)) {
      const regexStr = `^([a-zA-Z0-9]+)${op}$`;
      const re = config.case_sensitive
        ? new RegExp(regexStr, 'g')
        : new RegExp(regexStr, 'ig');
      const check = re.exec(key);
      if (check !== null) {
        if (
          (allowedKeys !== null && allowedKeys.includes(check[1])) ||
          allowedKeys === null
        ) {
          filtered.push(processor.parser(check[1], value));
        }
      }
    }
  });
  return filtered.length > 0 ? filtered : null;
};

const paginate = (config, queryString) => {
  const mappedQueryStrings = Object.assign({}, queryString);
  const pageName = !config.case_sensitive
    ? config.pageParamName.toLowerCase()
    : config.pageParamName;
  const limit = !config.case_sensitive
    ? config.limitParamName.toLowerCase()
    : config.limitParamName;

  if (!config.case_sensitive) {
    _.entries(queryString).forEach(([key, value]) => {
      // remove old key
      delete mappedQueryStrings[key];
      mappedQueryStrings[key.toLowerCase()] = value;
    });
  }

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

const parse = (config, queryString, allowedKeys = null) => {
  return {
    filter: filtering(config, queryString, allowedKeys),
    pagination: paginate(config, queryString),
  };
};

module.exports = (config = {}) => {
  const defaultConfig = {
    case_sensitive: false,
    pageParamName: 'page',
    limitParamName: 'count',
    perPage: 20,
    maxCountPerPage: 100,
  };

  const compiledConfig = Object.assign({}, defaultConfig, config);

  return {
    parse: _.curry(parse)(compiledConfig),
  };
};
