import 'node:fs';
import 'node:fs/promises';
import os from 'node:os';
import 'node:path';
import { spawn } from 'node:child_process';

/**
 * Logs an error message in GitHub Actions.
 *
 * @param err - The error, which can be of any type.
 */
function logError(err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stdout.write(`::error::${message}${os.EOL}`);
}

async function executeProcess(command, ...args) {
    const proc = spawn(command, args, { stdio: "inherit" });
    return new Promise((resolve, reject) => {
        proc.on("error", reject);
        proc.on("close", (code) => {
            if (code === 0) {
                resolve();
            }
            else {
                reject(new Error(`Process failed with exit code ${code}`));
            }
        });
    });
}

try {
    await executeProcess("ctest", "--test-dir", "build");
}
catch (err) {
    logError(err);
    process.exitCode = 1;
}
