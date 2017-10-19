'use strict'

module.exports = value => {
  return {
    operator: '$like',
    operatorSQL: 'LIKE',
    value: value
  }
}
