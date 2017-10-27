'use strict';

module.exports = (column, value) => {
  return {
    operator: '$notIn',
    operatorSQL: 'NOT IN',
    column,
    value: value.replace(/ /g, '').split(','),
  };
};
