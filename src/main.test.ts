import { jest } from "@jest/globals";
import fsPromises from "node:fs/promises";
import os from "node:os";

beforeAll(() => {
  process.chdir(os.tmpdir());
});

beforeEach(async () => {
  await fsPromises.rm("build", { recursive: true, force: true });
  jest.resetModules();
});

it("should test successfully", async () => {
  await fsPromises.mkdir("build");

  await import("./main.js");

  expect(process.exitCode).toBeUndefined();
});

it("should fail to test because the directory does not exist", async () => {
  await import("./main.js");

  expect(process.exitCode).toBe(1);
  process.exitCode = undefined;
});

afterAll(async () => {
  await fsPromises.rm("build", { recursive: true, force: true });
});
