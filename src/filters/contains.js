'use strict'

module.exports = value => {
  return {
    operator: '$contains',
    operatorSQL: '@>',
    value: value.split(',')
  }
}
