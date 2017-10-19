'use strict'

const _ = require('lodash')

const operators = {
  '__eq': {
    parser: require('./filters/equals')
  },
  '__ne': {
    parser: require('./filters/equals')
  },
  '__lt': {
    parser: require('./filters/equals')
  },
  '__gt': {
    parser: require('./filters/equals')
  },
  '__lte': {
    parser: require('./filters/equals')
  },
  '__gte': {
    parser: require('./filters/equals')
  },
  '__not': {
    parser: require('./filters/equals')
  },
  '__in': {
    parser: require('./filters/equals')
  },
  '__notIn': {
    parser: require('./filters/equals')
  },
  '__like': {
    parser: require('./filters/equals')
  },
  '__ilike': {
    parser: require('./filters/equals')
  },
  '__notLike': {
    parser: require('./filters/equals')
  },
  '__contains': {
    parser: require('./filters/equals')
  },
  '__icontains': {
    parser: require('./filters/equals')
  },
  '__between': {
    parser: require('./filters/equals')
  },
  '__notBetween': {
    parser: require('./filters/equals')
  }
}

const parse = (allowedKeys = null, queryString) => {
  // check the querystring key if contains filter suffix
  allowedQueryString = (allowedKeys === null) 
    ? Object.assign({}, queryString) 
    : _.pick(queryString, allowedKeys)
  
  // remove the filter params form queryString
  // get the associate filter and do filter
  // load middleware to compile and manipulate
  // merge with unfiltered params
  // return it
}


module.exports = {
  parse
}