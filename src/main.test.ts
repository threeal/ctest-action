import { jest } from "@jest/globals";

const executeProcess =
  jest.fn<(command: string, ...args: string[]) => Promise<void>>();
jest.unstable_mockModule("./exec.js", () => ({ executeProcess }));

const getCtestArguments = jest.fn<() => string[]>();
jest.unstable_mockModule("./args.js", () => ({ getCtestArguments }));

beforeEach(async () => {
  jest.resetModules();
});

it("should run successfully", async () => {
  getCtestArguments.mockReturnValue(["args"]);
  executeProcess.mockResolvedValue(undefined);

  process.env["INPUT_TEST-DIR"] = "build";
  await import("./main.js");

  expect(executeProcess).toHaveBeenCalledWith("ctest", "args");
  expect(process.exitCode).toBeUndefined();
});

it("should fail to run", async () => {
  executeProcess.mockRejectedValue(new Error("unknown error"));

  process.env["INPUT_TEST-DIR"] = "build";
  await import("./main.js");

  expect(process.exitCode).toBe(1);
  process.exitCode = undefined;
});
