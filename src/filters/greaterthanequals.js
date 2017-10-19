'use strict'

module.exports = value => {
  return {
    operator: '$gte',
    operatorSQL: '>=',
    value: value
  }
}
