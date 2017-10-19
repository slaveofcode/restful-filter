'use strict'

module.exports = value => {
  return {
    operator: '$lt',
    operatorSQL: '<',
    value: value
  }
}
