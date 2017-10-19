'use strict'

module.exports = value => {
  return {
    operator: '$lte',
    operatorSQL: '<=',
    value: value
  }
}
