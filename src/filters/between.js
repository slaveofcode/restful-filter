'use strict'

module.exports = value => {
  return {
    operator: '$between',
    operatorSQL: ['BETWEEN', 'AND'],
    value: value.split(',')
  }
}
