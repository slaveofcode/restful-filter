'use strict';

module.exports = (column, value) => {
  return {
    operator: '$contains',
    operatorSQL: '@>',
    column,
    value: value.replace(/ /g, '').split(','),
  };
};
