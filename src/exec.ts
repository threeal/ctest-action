import { spawn } from "node:child_process";

export async function executeProcess(
  command: string,
  ...args: string[]
): Promise<void> {
  const proc = spawn(command, args, { stdio: "inherit" });
  return new Promise<void>((resolve, reject) => {
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Process failed with exit code ${code}`));
      }
    });
  });
}