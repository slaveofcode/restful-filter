# Restful filter

This library aim to convert querystring parameters into parsed json with related operators, 
so you would able to use the parsed values into another query action like filtering by using your model.

## Installation

    # via npm
    npm i restful-filter --save

    # via yarn
    yarn add rest

## Usage

    const restfulFilter = require('restful-filter)

    # /api/users?name__ilike=aditya&age__eq=25&password__ilike=%a%
    .get('/users', (req, res, next) => {
      const queryParams = req.query
      const allowedColumn = ['name', 'age']
      const searchParams = restfulFilter.parse(queryParams, allowedColumn)

      # now searchParams contains
      # {
      #   name: {operator: '$iLike', operatorSQL: 'ilike', value: 'aditya'},
      #   age: {operator: '$eq', operatorSQL: '=', value: '25'}
      # }
      #
      # password filter will not processed because not listed in the allowedColumn
    })

## Operators

  Operator | Description | Example
  --- | --- | --- | --- |--- |--- |--- |--- |--- |--- |--- |---
  `__eq` | Find column equal with value | `?name__eq=smith`

## License
MIT