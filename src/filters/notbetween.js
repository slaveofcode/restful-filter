'use strict'

module.exports = (column, value) => {
  return {
    operator: '$notBetween',
    operatorSQL: ['NOT BETWEEN', 'AND'],
    column,
    value: value.split(',')
  }
}
