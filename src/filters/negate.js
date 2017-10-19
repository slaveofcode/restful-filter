'use strict'

module.exports = value => {
  return {
    operator: '$ne',
    operatorSQL: '!=',
    value: value
  }
}
