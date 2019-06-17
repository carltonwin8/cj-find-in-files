const api = require("./api");

test("test find in this directory", () => {
  api.findInFiles("child");
});

test("show find cli options", () => {
  console.log(api.cliOptions2d());
});
