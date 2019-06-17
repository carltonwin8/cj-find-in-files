const { spawn } = require("child_process");

// only reason for 2D below is not to get reformated by pretty
const cliOptions2d = (str = "<string>") => [
  ["."],
  ["-name", "node_modules", "-prune", "-o"],
  ["-name", ".git", "-prune", "-o"],
  ["-name", ".build", "-prune", "-o"],
  ["-name", "build", "-prune", "-o"],
  ["-name", ".next", "-prune", "-o"],
  ["-name", "_next", "-prune", "-o"],
  ["-name", "*.js"],
  ["-exec", "grep", "-inH", `${str}`, "{}", ";"]
];

function showOptions(str) {
  console.log(cliOptions2d(str));
}
function findInFiles(str) {
  const findCli = cliOptions2d(str).reduce((a, i) => [...a, ...i], []);
  const find = spawn("find", findCli, { stdio: "inherit" });
  return find;
}

module.exports = {
  findInFiles,
  showOptions
};
