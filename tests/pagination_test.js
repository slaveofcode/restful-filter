'use strict';

const chai = require('chai');
const restParser = require('../src');
const expect = chai.expect;

const parser = restParser();

describe('Parser Pagination', () => {
  it('Should be able to define offset and limit on one page', () => {
    expect(
      parser.parse({
        page: 1,
        count: 40,
      }).paginate
    ).to.deep.equal({ offset: 0, limit: 40 });
    expect(
      parser.parse({
        page: 1,
        count: 20,
      }).paginate
    ).to.deep.equal({ offset: 0, limit: 20 });
    expect(
      parser.parse({
        page: 1,
        count: 30,
      }).paginate
    ).to.deep.equal({ offset: 0, limit: 30 });
  });
  it('Should be able to define offset and limit by default', () => {
    expect(parser.parse({}).paginate).to.deep.equal({ offset: 0, limit: 20 });
  });
  it('Should be able to define offset and limit with dynamic page number and count', () => {
    expect(
      parser.parse({
        page: 2,
        count: 20,
      }).paginate
    ).to.deep.equal({ offset: 20, limit: 20 });
    expect(
      parser.parse({
        page: 5,
        count: 10,
      }).paginate
    ).to.deep.equal({ offset: 40, limit: 10 });
    expect(
      parser.parse({
        page: 3,
        count: 30,
      }).paginate
    ).to.deep.equal({ offset: 60, limit: 30 });
  });
  it('Should be able to define offset and limit with case insensitive and case sensitive', () => {
    const parserSensitive = restParser({ case_sensitive: true });
    const parserInsensitive = restParser({ case_sensitive: false });

    expect(
      parserSensitive.parse({
        page: 2,
        count: 20,
      }).paginate
    ).to.deep.equal({ offset: 20, limit: 20 });
    expect(
      parserInsensitive.parse({
        Page: 5,
        Count: 10,
      }).paginate
    ).to.deep.equal({ offset: 40, limit: 10 });
    expect(
      parserInsensitive.parse({
        PaGE: 3,
        cOUnt: 30,
      }).paginate
    ).to.deep.equal({ offset: 60, limit: 30 });
  });
  it('Should be able to set maximum row count on config', () => {
    const parserMax = restParser({ maxCountPerPage: 1000 });
    expect(
      parserMax.parse({
        page: 1,
        count: 1000,
      }).paginate
    ).to.deep.equal({ offset: 0, limit: 1000 });
  });
  it('Should be able to define offset and limit with different param name', () => {
    const parserDiffParams = restParser({
      case_sensitive: false,
      pageParamName: 'section',
      limitParamName: 'total',
    });

    expect(
      parserDiffParams.parse({
        section: 1,
        total: 15,
      }).paginate
    ).to.deep.equal({ offset: 0, limit: 15 });

    expect(
      parserDiffParams.parse({
        Section: 2,
        Total: 45,
      }).paginate
    ).to.deep.equal({ offset: 45, limit: 45 });
  });
});
