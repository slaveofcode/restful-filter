"use strict";

const chai = require("chai");
const restParser = require("../src");
const expect = chai.expect;

const parser = restParser();

describe("Parser Filter", () => {
  it("Should be able to parse allowed keys", () => {
    const queryString = {
      name__eq: "aditya",
      age__between: "20,30",
      password__eq: "12345"
    };

    const result = parser.parse(queryString, ["name", "age"]);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(2);
    expect(filterResult).to.have.deep.nested.property("0.operator", "$eq");
    expect(filterResult).to.have.deep.nested.property("1.operator", "$between");
    expect(filterResult).to.not.have.deep.nested.property("2.operator", "$eq");
  });

  it("Should not be able to parse unallowed keys", () => {
    const queryString = {
      name__eq: "aditya",
      password__eq: "12345"
    };

    const result = parser.parse(queryString, ["name"]);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].column).to.equal("name");
    expect(filterResult).to.not.have.deep.nested.property("1.operator");
  });

  it("Should be able to parse with filter __eq", () => {
    const queryString = {
      name__eq: "aditya"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$eq");
    expect(filterResult[0].operatorSQL).to.equal("=");
    expect(filterResult[0].column).to.equal("name");
    expect(filterResult[0].value).to.equal("aditya");
  });

  it("Should be able to parse with filter __ne", () => {
    const queryString = {
      name__ne: "aditya"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$ne");
    expect(filterResult[0].operatorSQL).to.equal("!=");
    expect(filterResult[0].column).to.equal("name");
    expect(filterResult[0].value).to.equal("aditya");
  });

  it("Should be able to parse with filter __lt", () => {
    const queryString = {
      age__lt: 30
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$lt");
    expect(filterResult[0].operatorSQL).to.equal("<");
    expect(filterResult[0].column).to.equal("age");
    expect(filterResult[0].value).to.equal(30);
  });

  it("Should be able to parse with filter __gt", () => {
    const queryString = {
      age__gt: 20
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$gt");
    expect(filterResult[0].operatorSQL).to.equal(">");
    expect(filterResult[0].column).to.equal("age");
    expect(filterResult[0].value).to.equal(20);
  });

  it("Should be able to parse with filter __lte", () => {
    const queryString = {
      age__lte: 25
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$lte");
    expect(filterResult[0].operatorSQL).to.equal("<=");
    expect(filterResult[0].column).to.equal("age");
    expect(filterResult[0].value).to.equal(25);
  });

  it("Should be able to parse with filter __gte", () => {
    const queryString = {
      age__gte: 25
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$gte");
    expect(filterResult[0].operatorSQL).to.equal(">=");
    expect(filterResult[0].column).to.equal("age");
    expect(filterResult[0].value).to.equal(25);
  });

  it("Should be able to parse with filter __not", () => {
    const queryString = {
      shutdown__not: true
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$not");
    expect(filterResult[0].operatorSQL).to.equal("IS NOT");
    expect(filterResult[0].column).to.equal("shutdown");
    expect(filterResult[0].value).to.equal(true);
  });

  it("Should be able to parse with filter __in", () => {
    const queryString = {
      fruits__in: "grape,apple,orange"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$in");
    expect(filterResult[0].operatorSQL).to.equal("IN");
    expect(filterResult[0].column).to.equal("fruits");
    expect(filterResult[0].value).to.be.an("array");
    expect(filterResult[0].value).to.have.lengthOf(3);
    expect(filterResult[0].value[0]).to.equal("grape");
    expect(filterResult[0].value[1]).to.equal("apple");
    expect(filterResult[0].value[2]).to.equal("orange");
  });

  it("Should be able to parse with filter __notIn", () => {
    const queryString = {
      fruits__notIn: "grape,apple,orange"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$notIn");
    expect(filterResult[0].operatorSQL).to.equal("NOT IN");
    expect(filterResult[0].column).to.equal("fruits");
    expect(filterResult[0].value).to.be.an("array");
    expect(filterResult[0].value).to.have.lengthOf(3);
    expect(filterResult[0].value[0]).to.equal("grape");
    expect(filterResult[0].value[1]).to.equal("apple");
    expect(filterResult[0].value[2]).to.equal("orange");
  });

  it("Should be able to parse with filter __contains", () => {
    const queryString = {
      fruits__contains: "grape,apple,orange"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$contains");
    expect(filterResult[0].operatorSQL).to.equal("@>");
    expect(filterResult[0].column).to.equal("fruits");
    expect(filterResult[0].value).to.be.an("array");
    expect(filterResult[0].value).to.have.lengthOf(3);
    expect(filterResult[0].value[0]).to.equal("grape");
    expect(filterResult[0].value[1]).to.equal("apple");
    expect(filterResult[0].value[2]).to.equal("orange");
  });

  it("Should be able to parse with filter __like", () => {
    const queryString = {
      name__like: "john%"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$like");
    expect(filterResult[0].operatorSQL).to.equal("LIKE");
    expect(filterResult[0].column).to.equal("name");
    expect(filterResult[0].value).to.equal("john%");
  });

  it("Should be able to parse with filter __ilike", () => {
    const queryString = {
      name__iLike: "john%"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$iLike");
    expect(filterResult[0].operatorSQL).to.equal("ILIKE");
    expect(filterResult[0].column).to.equal("name");
    expect(filterResult[0].value).to.equal("john%");
  });

  it("Should be able to parse with filter __notLike", () => {
    const queryString = {
      name__notLike: "john%"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$notLike");
    expect(filterResult[0].operatorSQL).to.equal("NOT LIKE");
    expect(filterResult[0].column).to.equal("name");
    expect(filterResult[0].value).to.equal("john%");
  });

  it("Should be able to parse with filter __notILike", () => {
    const queryString = {
      name__notILike: "john%"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$notILike");
    expect(filterResult[0].operatorSQL).to.equal("NOT ILIKE");
    expect(filterResult[0].column).to.equal("name");
    expect(filterResult[0].value).to.equal("john%");
  });

  it("Should be able to parse with filter __between", () => {
    const queryString = {
      date__between: "18-06-1991,31-05-1992"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$between");
    expect(filterResult[0].operatorSQL).to.be.an("array");
    expect(filterResult[0].operatorSQL).to.have.lengthOf(2);
    expect(filterResult[0].operatorSQL[0]).to.equal("BETWEEN");
    expect(filterResult[0].operatorSQL[1]).to.equal("AND");
    expect(filterResult[0].column).to.equal("date");
    expect(filterResult[0].value).to.have.lengthOf(2);
    expect(filterResult[0].value[0]).to.equal("18-06-1991");
    expect(filterResult[0].value[1]).to.equal("31-05-1992");
  });

  it("Should be able to parse with filter __notBetween", () => {
    const queryString = {
      date__notBetween: "18-06-1991,31-05-1992"
    };

    const result = parser.parse(queryString);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(1);
    expect(filterResult[0].operator).to.equal("$notBetween");
    expect(filterResult[0].operatorSQL).to.be.an("array");
    expect(filterResult[0].operatorSQL).to.have.lengthOf(2);
    expect(filterResult[0].operatorSQL[0]).to.equal("NOT BETWEEN");
    expect(filterResult[0].operatorSQL[1]).to.equal("AND");
    expect(filterResult[0].column).to.equal("date");
    expect(filterResult[0].value).to.have.lengthOf(2);
    expect(filterResult[0].value[0]).to.equal("18-06-1991");
    expect(filterResult[0].value[1]).to.equal("31-05-1992");
  });

  it("Should be able to parse with case sensitive and case insensitive filter", () => {
    const parserCaseSensitive = restParser({ case_sensitive: true });
    const parserCaseInsensitive = restParser();

    const queryString = {
      fruit__ilike: "ora",
      name__notlike: "james",
      name__notilike: "james",
      date__notbetween: "18-06-1991,31-05-1992",
      age__notin: "25,30"
    };

    const resultSensitive = parserCaseSensitive.parse(queryString);
    const resultInsensitive = parserCaseInsensitive.parse(queryString);

    const filterResultSensitive = resultSensitive.filter;
    const filterResultInsensitive = resultInsensitive.filter;

    expect(filterResultSensitive).to.equal(null);
    expect(filterResultInsensitive).to.be.an("array");
    expect(filterResultInsensitive).to.have.lengthOf(5);
    expect(filterResultInsensitive[0].operator).to.equal("$iLike");
    expect(filterResultInsensitive[1].operator).to.equal("$notLike");
    expect(filterResultInsensitive[2].operator).to.equal("$notILike");
    expect(filterResultInsensitive[3].operator).to.equal("$notBetween");
    expect(filterResultInsensitive[4].operator).to.equal("$notIn");
  });

  it("Should be able to parse columns with underscore", () => {
    const queryString = {
      first_name__eq: "aditya",
      the_middle_name__eq: "kresna",
      last_name__eq: "permana",
      age__between: "26,30"
    };

    const result = parser.parse(queryString, [
      "first_name",
      "the_middle_name",
      "last_name",
      "age"
    ]);

    const filterResult = result.filter;

    expect(filterResult).to.be.an("array");
    expect(filterResult).to.have.lengthOf(4);
    expect(filterResult).to.have.deep.nested.property("0.operator", "$eq");
    expect(filterResult).to.have.deep.nested.property("1.operator", "$eq");
    expect(filterResult).to.have.deep.nested.property("2.operator", "$eq");
    expect(filterResult).to.have.deep.nested.property("3.operator", "$between");
  });
});
