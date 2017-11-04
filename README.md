# Restful filter

This library aim to convert querystring parameters into parsed json with related operators, 
so you would able to use the parsed values into another query action like filtering by using your model on SQL library (knex, sequelize, etc).

# Features
 - Filter querystring parameters
 - Parse pagination by using `page` and `count` parameter
 - Parse ordering by using `order` parameter

## Installation

    # via npm
    npm i restful-filter --save

    # via yarn
    yarn add rest

## Usage

    const restfulFilter = require('restful-filter)

    const filter = restfulFilter({ 
        case_sensitive: false // false by default, this is just example
    })

    # FILTER
    # /api/users?name__ilike=aditya&age__eq=25&password__ilike=%a%
    .get('/users', (req, res, next) => {
      const queryParams = req.query
      const allowedColumn = ['name', 'age']
      const searchParams = filter.parse(queryParams, allowedColumn).filter

      # now searchParams contains
      # {
      #   name: {operator: '$iLike', operatorSQL: 'ILIKE', column: 'name', value: 'aditya'},
      #   age: {operator: '$eq', operatorSQL: '=', column: 'age', value: '25'}
      # }
      #
      # password filter will not processed because not listed in the allowedColumn
    })

    # PAGINATION
    # /api/users?page=2
    .get('/users', (req, res, next) => {
        const queryParams = req.query
        const paginationParams = filter.parse(queryParams).paginate

        # paginationParams contains
        # {
        #   offset: 20,
        #   limit: 20   
        # }
    })

    # ORDER
    # api/users?order_by=-id,name
    .get('/users', (req, res, next) => {
        const queryParams = req.query
        const orderParams = filter.parse(queryParams).order

        # orderParams contains
        # [
        #   ['id', 'DESC']
        #   ['name', 'ASC']
        # ]

        # You even can limit the order column value by using second parameter as allowedColumn to process
        # Like 
        
        const orderParams = filter.parse(queryParams, ['id']).order

        # Would return
        # [
        #   ['id', 'DESC']
        # ]
    })

    




## Configuration
  
  Key | Default Value | Description
  --- | --- | ---
  `case_sensitive` | false | Use case sensitive on query string parameter and parameter value
  `page_param_name` | `page` | Page parameter name to be used on querystring
  `limit_param_name` | `count` | Limit parameter name to be used on querystring
  `per_page` | 20 | Default number count per request if not set
  `max_count_per_page` | 100 | Maximum count for `per_page` parameter, so for example if `count` parameter value is higher than 100, the return value would stick to 100
  `order_param_name` | `order_by` | Order parameter name to be used on querystring

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

# Note
Please open a pull request for further abilities and another issues

## License
MIT