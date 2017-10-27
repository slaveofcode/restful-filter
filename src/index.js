'use strict'

const _ = require('lodash')

const OPERATORS = {
  '__eq': {
    parser: require('./filters/equals')
  },
  '__ne': {
    parser: require('./filters/negate')
  },
  '__lte': {
    parser: require('./filters/lessthanequals')
  },
  '__gte': {
    parser: require('./filters/greaterthanequals')
  },
  '__lt': {
    parser: require('./filters/lessthan')
  },
  '__gt': {
    parser: require('./filters/greaterthan')
  },
  '__not': {
    parser: require('./filters/not')
  },
  '__in': {
    parser: require('./filters/in')
  },
  '__notIn': {
    parser: require('./filters/notin')
  },
  '__like': {
    parser: require('./filters/like')
  },
  '__iLike': {
    parser: require('./filters/ilike')
  },
  '__notLike': {
    parser: require('./filters/notlike')
  },
  '__notILike': {
    parser: require('./filters/notilike')
  },
  '__contains': {
    parser: require('./filters/contains')
  },
  '__between': {
    parser: require('./filters/between')
  },
  '__notBetween': {
    parser: require('./filters/notbetween')
  }
}

const filtering = (config, queryString, allowedKeys) => {
  const filtered = []
  _.entries(queryString).forEach(([key, value]) => {
    for (const [op, processor] of _.entries(OPERATORS)) {
      const regexStr = `^([a-zA-Z0-9]+)${op}$`
      const re = (config.case_sensitive) 
        ? new RegExp(regexStr, 'g') 
        : new RegExp(regexStr, 'ig')
      const check = re.exec(key)
      if (check !== null) {
        if ((allowedKeys !== null && allowedKeys.includes(check[1])) 
          || allowedKeys === null) {
          
          filtered.push(processor.parser(check[1], value))

        }
      }
    }
  })
  return filtered.length > 0 ? filtered : null
}

const parse = (config, queryString, allowedKeys = null) => {

  return {
    filter: filtering(config, queryString, allowedKeys)
  }
}


module.exports = (config = {}) => {
  const defaultConfig = {
    case_sensitive: false
  }

  const compiledConfig = Object.assign({}, defaultConfig, config)

  return {
    parse: _.curry(parse)(compiledConfig)
  }
}
