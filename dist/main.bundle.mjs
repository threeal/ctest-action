import { spawn } from 'node:child_process';
import 'node:fs';
import 'node:fs/promises';
import os from 'node:os';
import 'node:path';

/**
 * Logs an error message in GitHub Actions.
 *
 * @param err - The error, which can be of any type.
 */
function logError(err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stdout.write(`::error::${message}${os.EOL}`);
}

try {
    const ctest = spawn("ctest", ["--test-dir", "build"], { stdio: "inherit" });
    await new Promise((resolve, reject) => {
        ctest.on("error", reject);
        ctest.on("close", (code) => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(`Process failed with exit code ${code}`));
            }
        });
    });
}
catch (err) {
    logError(err);
    process.exitCode = 1;
}
