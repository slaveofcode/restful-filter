'use strict'

module.exports = value => {
  return {
    operator: '$ge',
    operatorSQL: '>',
    value: value
  }
}
