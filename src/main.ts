import { logError } from "gha-utils";
import { getCtestArguments } from "./args.js";
import { executeProcess } from "./exec.js";

try {
  await executeProcess("ctest", ...getCtestArguments());
} catch (err) {
  logError(err);
  process.exitCode = 1;
}
