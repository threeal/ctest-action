import { logError } from "gha-utils";
import { executeProcess } from "./exec.js";
import { getCtestArguments } from "./args.js";

try {
  await executeProcess("ctest", ...getCtestArguments());
} catch (err) {
  logError(err);
  process.exitCode = 1;
}
