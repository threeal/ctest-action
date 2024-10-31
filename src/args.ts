import { getInput } from "gha-utils";

export function getCtestArguments(): string[] {
  const args = ["--test-dir", getInput("test-dir")];

  const buildConfig = getInput("build-config");
  if (buildConfig !== "") args.push("--build-config", buildConfig);

  const testsRegex = getInput("tests-regex");
  if (testsRegex !== "") args.push("--tests-regex", testsRegex);

  if (getInput("verbose") === "true") args.push("--verbose");

  args.push(
    "--output-on-failure",
    "--no-tests=error",
    ...getInput("args")
      .split(/\s+/)
      .filter((arg) => arg !== ""),
  );

  return args;
}
