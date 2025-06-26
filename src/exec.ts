import { logCommand } from "gha-utils";
import { spawn } from "node:child_process";

export async function executeProcess(
  command: string,
  ...args: string[]
): Promise<void> {
  logCommand(command, ...args);
  const proc = spawn(command, args, { stdio: "inherit" });
  return new Promise<void>((resolve, reject) => {
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else if (code !== null) {
        reject(new Error(`Process failed with exit code ${code.toString()}`));
      }
    });
  });
}
