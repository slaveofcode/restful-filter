'use strict'

module.exports = (column, value) => {
  return {
    operator: '$gt',
    operatorSQL: '>',
    column,
    value
  }
}
