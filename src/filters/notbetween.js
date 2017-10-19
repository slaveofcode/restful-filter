'use strict'

module.exports = value => {
  return {
    operator: '$notBetween',
    operatorSQL: ['NOT BETWEEN', 'AND'],
    value: value.split(',')
  }
}
