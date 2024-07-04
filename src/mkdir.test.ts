import { jest } from "@jest/globals";
import "jest-extended";

jest.unstable_mockModule("fs", () => ({
  default: {
    mkdirSync: jest.fn(),
  },
}));

it("should create a directory recursively", async () => {
  const fs = (await import("fs")).default;
  const { mkdirRecursive } = await import("./mkdir.js");

  mkdirRecursive("path/to/new/directory");

  expect(fs.mkdirSync).toHaveBeenCalledExactlyOnceWith(
    "path/to/new/directory",
    { recursive: true },
  );
});
