'use strict'

const chai = require('chai')
const parser = require('../src')
const expect = chai.expect


describe('Parser', () => {
  it('Should be able to parse allowed keys', () => {
    const queryString = {
      name__eq: 'aditya',
      age__between: '20,30',
      password: '12345'
    }

    const result = parser.parse(queryString, ['name', 'age'])

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(2)
  })
  it('Should not be able to parse unallowed keys', () => {})
  it('Should be able to parse with filter __eq', () => {})
  it('Should be able to parse with filter __ne', () => {})
  it('Should be able to parse with filter __lt', () => {})
  it('Should be able to parse with filter __gt', () => {})
  it('Should be able to parse with filter __lte', () => {})
  it('Should be able to parse with filter __gte', () => {})
  it('Should be able to parse with filter __not', () => {})
  it('Should be able to parse with filter __in', () => {})
  it('Should be able to parse with filter __notIn', () => {})
  it('Should be able to parse with filter __like', () => {})
  it('Should be able to parse with filter __ilike', () => {})
})