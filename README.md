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

    const filter = restfulFilter({ case_sensitive: false }) // case_sensitive is false by default

    # /api/users?name__ilike=aditya&age__eq=25&password__ilike=%a%
    .get('/users', (req, res, next) => {
      const queryParams = req.query
      const allowedColumn = ['name', 'age']
      const searchParams = restfulFilter.parse(queryParams, allowedColumn)

      # now searchParams contains
      # {
      #   name: {operator: '$iLike', operatorSQL: 'ILIKE', column: 'name', value: 'aditya'},
      #   age: {operator: '$eq', operatorSQL: '=', column: 'age', value: '25'}
      # }
      #
      # password filter will not processed because not listed in the allowedColumn
    })

## Configuration
  
  Key | Default Value | Description
  --- | --- | ---
  `case_sensitive` | false | Use case sensitive on query string param

## Operators

  Operator | Description | Example
  --- | --- | ---
  `__eq` | Find column equal with value | `?name__eq=smith`
  `__not` | Not same with given value | `?active__not=true`
  `__ne` | Negation, the opposite of equal | `?name__ne=smith`
  `__lt` | Lower than | `?age__lt=10`
  `__gt` | Greater than | `?age__gt=15`
  `__lte` | Lower than and equal | `?age__lte=25`
  `__gte` | Greater than and equal | `?age__gte=20`
  `__like` | Like with case sensitive | `?name__like=smith`
  `__ilike` | Like with case insensitive (Postgres) | `?name__ilike=smith`
  `__notLike` | Opposite of like with case sensitive | `?name__notLike=smith`
  `__notILike` | Opposite of like with case insensitive (Postgres) | `?name__notILike=smith`
  `__in` | Find value which listed on given list | `?city__in=jakarta,bandung,bekasi`
  `__notIn` | Find value which not listed in given list | `?city__notIn=bogor,depok,tangerang`
  `__contains` | Find value that contains in given list (Postgres) | `?name__contains=smith`
  `__between` | Find value which between 2 given values | `?date__between=2015-06-18,2017-05-31`
  `__notBetween` | Find value which is not between 2 given values | `?date__notBetween=2015-06-18,2017-05-31`

## Test

    npm run test

## License
MIT