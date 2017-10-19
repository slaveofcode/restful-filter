'use strict'

const chai = require('chai')
const parser = require('../src')
const expect = chai.expect


describe('Parser', () => {
  it('Should be able to parse allowed keys', () => {
    const queryString = {
      name__eq: 'aditya',
      age__between: '20,30',
      password__eq: '12345'
    }

    const result = parser.parse(queryString, ['name', 'age'])

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(2)
    expect(result).to.have.deep.nested.property('0.operator', '$eq')
    expect(result).to.have.deep.nested.property('1.operator', '$between')
    expect(result).to.not.have.deep.nested.property('2.operator', '$eq')
  })
  
  it('Should not be able to parse unallowed keys', () => {
    const queryString = {
      name__eq: 'aditya',
      password__eq: '12345'
    }

    const result = parser.parse(queryString, ['name'])

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].column).to.equal('name')
    expect(result).to.not.have.deep.nested.property('1.operator')
  })

  it('Should be able to parse with filter __eq', () => {
    const queryString = { 
      name__eq: 'aditya'
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$eq')
    expect(result[0].operatorSQL).to.equal('=')
    expect(result[0].column).to.equal('name')
    expect(result[0].value).to.equal('aditya')
  })
  it('Should be able to parse with filter __ne', () => {
     const queryString = { 
      name__ne: 'aditya'
    }

    const result = parser.parse(queryString)
    
    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$ne')
    expect(result[0].operatorSQL).to.equal('!=')
    expect(result[0].column).to.equal('name')
    expect(result[0].value).to.equal('aditya')
  })
  it('Should be able to parse with filter __lt', () => {
     const queryString = { 
      age__lt: 30
    }

    const result = parser.parse(queryString)
    
    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$lt')
    expect(result[0].operatorSQL).to.equal('<')
    expect(result[0].column).to.equal('age')
    expect(result[0].value).to.equal(30)
  })

  it('Should be able to parse with filter __gt', () => {
    const queryString = { 
      age__gt: 20
    }

    const result = parser.parse(queryString)
    
    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$gt')
    expect(result[0].operatorSQL).to.equal('>')
    expect(result[0].column).to.equal('age')
    expect(result[0].value).to.equal(20)
  })

  it('Should be able to parse with filter __lte', () => {
    const queryString = { 
      age__lte: 25
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$lte')
    expect(result[0].operatorSQL).to.equal('<=')
    expect(result[0].column).to.equal('age')
    expect(result[0].value).to.equal(25)
  })

  it('Should be able to parse with filter __gte', () => {
    const queryString = { 
      age__gte: 25
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$gte')
    expect(result[0].operatorSQL).to.equal('>=')
    expect(result[0].column).to.equal('age')
    expect(result[0].value).to.equal(25)
  })

  it('Should be able to parse with filter __not', () => {
    const queryString = { 
      shutdown__not: true
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$not')
    expect(result[0].operatorSQL).to.equal('IS NOT')
    expect(result[0].column).to.equal('shutdown')
    expect(result[0].value).to.equal(true)
  })

  it('Should be able to parse with filter __in', () => {
    const queryString = { 
      fruits__in: 'grape,apple,orange'
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$in')
    expect(result[0].operatorSQL).to.equal('IN')
    expect(result[0].column).to.equal('fruits')
    expect(result[0].value).to.be.an('array')
    expect(result[0].value).to.have.lengthOf(3)
    expect(result[0].value[0]).to.equal('grape')
    expect(result[0].value[1]).to.equal('apple')
    expect(result[0].value[2]).to.equal('orange')
  })

  it('Should be able to parse with filter __notIn', () => {
    const queryString = { 
      fruits__notIn: 'grape,apple,orange'
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$notIn')
    expect(result[0].operatorSQL).to.equal('NOT IN')
    expect(result[0].column).to.equal('fruits')
    expect(result[0].value).to.be.an('array')
    expect(result[0].value).to.have.lengthOf(3)
    expect(result[0].value[0]).to.equal('grape')
    expect(result[0].value[1]).to.equal('apple')
    expect(result[0].value[2]).to.equal('orange')
  })

  it('Should be able to parse with filter __contains', () => {
    const queryString = { 
      fruits__contains: 'grape,apple,orange'
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$contains')
    expect(result[0].operatorSQL).to.equal('@>')
    expect(result[0].column).to.equal('fruits')
    expect(result[0].value).to.be.an('array')
    expect(result[0].value).to.have.lengthOf(3)
    expect(result[0].value[0]).to.equal('grape')
    expect(result[0].value[1]).to.equal('apple')
    expect(result[0].value[2]).to.equal('orange')
  })

  it('Should be able to parse with filter __like', () => {
    const queryString = { 
      name__like: 'john%'
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$like')
    expect(result[0].operatorSQL).to.equal('LIKE')
    expect(result[0].column).to.equal('name')
    expect(result[0].value).to.equal('john%')
  })

  it('Should be able to parse with filter __ilike', () => {
    const queryString = { 
      name__iLike: 'john%'
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$iLike')
    expect(result[0].operatorSQL).to.equal('ILIKE')
    expect(result[0].column).to.equal('name')
    expect(result[0].value).to.equal('john%')
  })

  it('Should be able to parse with filter __notLike', () => {
    const queryString = { 
      name__notLike: 'john%'
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$notLike')
    expect(result[0].operatorSQL).to.equal('NOT LIKE')
    expect(result[0].column).to.equal('name')
    expect(result[0].value).to.equal('john%')
  })
  
  it('Should be able to parse with filter __notILike', () => {
    const queryString = { 
      name__notILike: 'john%'
    }

    const result = parser.parse(queryString)

    expect(result).to.be.an('array')
    expect(result).to.have.lengthOf(1)
    expect(result[0].operator).to.equal('$notILike')
    expect(result[0].operatorSQL).to.equal('NOT ILIKE')
    expect(result[0].column).to.equal('name')
    expect(result[0].value).to.equal('john%')
  })
})