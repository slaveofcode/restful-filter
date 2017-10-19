'use strict'

module.exports = (column, value) => {
  return {
    operator: '$lt',
    operatorSQL: '<',
    column,
    value
  }
}
