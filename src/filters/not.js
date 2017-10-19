'use strict'

module.exports = (column, value) => {
  return {
    operator: '$not',
    operatorSQL: 'IS NOT',
    column,
    value
  }
}
