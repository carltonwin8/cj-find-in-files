#!/usr/bin/env node
let inquirer = require("inquirer");

const api = require("./api");

const cmd = () => {
  return inquirer
    .prompt([{ type: "input", message: "Enter string to search", name: "str" }])
    .then(({ str }) => api.findInFiles(str))
    .catch(e => console.error("Failed running find cli with", e.message));
};

if (require.main === module) cmd();

module.exports = params => {
  // below for and external cli call using the cli code in this module
  if (params && params.inquirer) inquirer = params.inquirer;
  if (params && params.getCmd) return cmd;
  // below for using the api module directly - gui use
  if (params && params.getApi) return api;
};
