'use strict'

module.exports = value => {
  return {
    operator: '$in',
    operatorSQL: 'IN',
    value: value.split(',')
  }
}
