import { beforeEach, expect, it, vi } from "vitest";
import { getCtestArguments } from "./args.js";
import { executeProcess } from "./exec.js";

vi.mock("./exec.js", () => ({ executeProcess: vi.fn() }));
vi.mock("./args.js", () => ({ getCtestArguments: vi.fn() }));

beforeEach(() => {
  vi.resetModules();
});

it("should run successfully", async () => {
  vi.mocked(getCtestArguments).mockReturnValue(["args"]);
  vi.mocked(executeProcess).mockResolvedValue(undefined);

  process.env["INPUT_TEST-DIR"] = "build";
  await import("./main.js");

  expect(executeProcess).toHaveBeenCalledWith("ctest", "args");
  expect(process.exitCode).toBeUndefined();
});

it("should fail to run", async () => {
  vi.mocked(executeProcess).mockRejectedValue(new Error("unknown error"));

  process.env["INPUT_TEST-DIR"] = "build";
  await import("./main.js");

  expect(process.exitCode).toBe(1);
  process.exitCode = undefined;
});
