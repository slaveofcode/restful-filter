'use strict'

module.exports = (column, value) => {
  return {
    operator: '$gte',
    operatorSQL: '>=',
    column,
    value
  }
}
