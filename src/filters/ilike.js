'use strict'

module.exports = value => {
  return {
    operator: '$iLike',
    operatorSQL: 'ILIKE',
    value: value
  }
}
