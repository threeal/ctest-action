import { expect, it } from "vitest";
import { executeProcess } from "./exec.js";

it("should execute a process", async () => {
  await executeProcess("node", "--version");
});

it("should fail to execute a process", async () => {
  await expect(executeProcess("node", "--invalid")).rejects.toThrow(
    /Process failed with exit code/,
  );
});
