import { getCtestArguments } from "./args.js";

it("should retrieve default arguments", async () => {
  process.env["INPUT_TEST-DIR"] = "build";
  expect(getCtestArguments()).toEqual([
    "--test-dir",
    "build",
    "--output-on-failure",
    "--no-tests=error",
  ]);
});

it("should retrieve fully specified arguments", async () => {
  process.env["INPUT_TEST-DIR"] = "output";
  process.env["INPUT_BUILD-CONFIG"] = "Debug";
  process.env["INPUT_TESTS-REGEX"] = ".*";
  process.env["INPUT_VERBOSE"] = "true";
  process.env["INPUT_ARGS"] = "first\nsecond third";
  expect(getCtestArguments()).toEqual([
    "--test-dir",
    "output",
    "--build-config",
    "Debug",
    "--tests-regex",
    ".*",
    "--verbose",
    "--output-on-failure",
    "--no-tests=error",
    "first",
    "second",
    "third",
  ]);
});
