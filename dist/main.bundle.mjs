import 'node:fs';
import 'node:fs/promises';
import os from 'node:os';
import 'node:path';
import { spawn } from 'node:child_process';

/**
 * Retrieves the value of a GitHub Actions input.
 *
 * @param name - The name of the GitHub Actions input.
 * @returns The value of the GitHub Actions input, or an empty string if not found.
 */
function getInput(name) {
    const value = process.env[`INPUT_${name.toUpperCase()}`] ?? "";
    return value.trim();
}

/**
 * Logs an error message in GitHub Actions.
 *
 * @param err - The error, which can be of any type.
 */
function logError(err) {
    const message = err instanceof Error ? err.message : String(err);
    process.stdout.write(`::error::${message}${os.EOL}`);
}
/**
 * Logs a command along with its arguments in GitHub Actions.
 *
 * @param command - The command to log.
 * @param args - The arguments of the command.
 */
function logCommand(command, ...args) {
    const message = [command, ...args].join(" ");
    process.stdout.write(`[command]${message}${os.EOL}`);
}

async function executeProcess(command, ...args) {
    logCommand(command, ...args);
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

function getCtestArguments() {
    const args = ["--test-dir", getInput("test-dir")];
    const buildConfig = getInput("build-config");
    if (buildConfig !== "")
        args.push("--build-config", buildConfig);
    const testsRegex = getInput("tests-regex");
    if (testsRegex !== "")
        args.push("--tests-regex", testsRegex);
    if (getInput("verbose") === "true")
        args.push("--verbose");
    args.push("--output-on-failure", "--no-tests=error", ...getInput("args")
        .split(/\s+/)
        .filter((arg) => arg !== ""));
    return args;
}

try {
    await executeProcess("ctest", ...getCtestArguments());
}
catch (err) {
    logError(err);
    process.exitCode = 1;
}
