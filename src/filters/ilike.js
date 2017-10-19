'use strict'

module.exports = (column, value) => {
  return {
    operator: '$iLike',
    operatorSQL: 'ILIKE',
    column,
    value
  }
}
