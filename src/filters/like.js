'use strict'

module.exports = (column, value) => {
  return {
    operator: '$like',
    operatorSQL: 'LIKE',
    column,
    value
  }
}
