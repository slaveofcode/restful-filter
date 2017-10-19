'use strict'

module.exports = value => {
  return {
    operator: '$notIn',
    operatorSQL: 'NOT IN',
    value: value.split(',')
  }
}
