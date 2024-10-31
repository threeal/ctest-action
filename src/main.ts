import { spawn } from "node:child_process";
import { logError } from "gha-utils";

try {
  const ctest = spawn("ctest", ["--test-dir", "build"], { stdio: "inherit" });
  await new Promise<void>((resolve, reject) => {
    ctest.on("error", reject);
    ctest.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process failed with exit code ${code}`));
      }
    });
  });
} catch (err) {
  logError(err);
  process.exitCode = 1;
}
