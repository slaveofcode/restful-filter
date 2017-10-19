'use strict'

module.exports = value => {
  return {
    operator: '$notLike',
    operatorSQL: 'NOT LIKE',
    value: value
  }
}
