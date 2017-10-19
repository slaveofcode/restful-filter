'use strict'

module.exports = (column, value) => {
  return {
    operator: '$notLike',
    operatorSQL: 'NOT LIKE',
    column,
    value
  }
}
