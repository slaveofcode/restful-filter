'use strict'

module.exports = value => {
  return {
    operator: '$notILike',
    operatorSQL: 'NOT ILIKE',
    value: value
  }
}
