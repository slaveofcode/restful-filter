'use strict';

const chai = require('chai');
const restParser = require('../src');
const expect = chai.expect;

const parser = restParser();

describe('Parser Order', () => {
  it('Should be able to detect order asc', () => {
    const orderParam = {
      order_by: 'name',
    };

    const resultOrder = parser.parse(orderParam).order;
    expect(resultOrder).to.be.an('array');
    expect(resultOrder).to.have.deep.ordered.members([['name', 'ASC']]);
  });
  it('Should be able to detect order desc', () => {
    const orderParam = {
      order_by: '-name',
    };

    const resultOrder = parser.parse(orderParam).order;
    expect(resultOrder).to.be.an('array');
    expect(resultOrder).to.have.deep.ordered.members([['name', 'DESC']]);
  });
  it('Should be able to detect order multiple columns', () => {
    const orderParam = {
      order_by: '-id,name',
    };

    const resultOrder = parser.parse(orderParam).order;
    expect(resultOrder).to.be.an('array');
    expect(resultOrder).to.have.deep.ordered.members([
      ['id', 'DESC'],
      ['name', 'ASC'],
    ]);
  });
  it('Should be able to detect order multiple columns with space between', () => {
    const orderParam = {
      order_by: '-id, name',
    };

    const resultOrder = parser.parse(orderParam).order;
    expect(resultOrder).to.be.an('array');
    expect(resultOrder).to.have.deep.ordered.members([
      ['id', 'DESC'],
      ['name', 'ASC'],
    ]);
  });
  it('Should be able to detect order with case sensitive & case insensitive', () => {
    const parserSensitive = restParser({ case_sensitive: true });

    const orderParam = {
      ORDER_BY: '-id, name',
    };

    const resultOrder = parserSensitive.parse(orderParam).order;
    expect(resultOrder).to.be.an('array').that.is.empty;
  });
});
