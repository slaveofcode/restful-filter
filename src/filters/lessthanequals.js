'use strict'

module.exports = (column, value) => {
  return {
    operator: '$lte',
    operatorSQL: '<=',
    column,
    value
  }
}
