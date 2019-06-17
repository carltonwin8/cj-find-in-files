#!/usr/bin/env node
let inquirer = require("inquirer");

const api = require("./api");

const showOptions = () => api.cliOptions2d();

const action = {
  type: "list",
  name: "choice",
  message: "Execute find or show find options",
  choices: [
    { name: "Execute", cmd: api.findInFiles },
    { name: "Show", cmd: api.showOptions }
  ]
};

const search = [
  {
    type: "input",
    message: "Enter search string",
    name: "str"
  }
];

let choice;
const cmd = () => {
  inquirer
    .prompt(action)
    .then(answers => {
      console.log(answers);
      choice = action.choices.filter(
        choice => choice.name === answers.choice
      )[0].cmd;
      return inquirer.prompt(search);
    })
    .then(answers => choice(answers.str))
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
