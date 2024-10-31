import { logError } from "gha-utils";
import { executeProcess } from "./exec.js";

try {
  await executeProcess("ctest", "--test-dir", "build");
} catch (err) {
  logError(err);
  process.exitCode = 1;
}
