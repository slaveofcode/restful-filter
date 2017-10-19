'use strict'

module.exports = (column, value) => {
  return {
    operator: '$notILike',
    operatorSQL: 'NOT ILIKE',
    column,
    value
  }
}
