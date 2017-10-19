'use strict'

module.exports = (column, value) => {
  return {
    operator: '$ne',
    operatorSQL: '!=',
    column,
    value
  }
}
