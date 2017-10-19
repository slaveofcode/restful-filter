'use strict'

module.exports = (column, value) => {
  return {
    operator: '$eq', 
    operatorSQL: '=',
    column,
    value
  }
}