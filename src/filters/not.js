'use strict'

module.exports = value => {
  return {
    operator: '$not',
    operatorSQL: 'IS NOT',
    value: value
  }
}
