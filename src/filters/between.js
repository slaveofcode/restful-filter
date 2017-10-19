'use strict'

module.exports = (column, value) => {
  return {
    operator: '$between',
    operatorSQL: ['BETWEEN', 'AND'],
    column,
    value: value.split(',')
  }
}
