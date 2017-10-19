'use strict'

module.exports = (column, value) => {
  return {
    operator: '$in',
    operatorSQL: 'IN',
    column,
    value: value.split(',')
  }
}
