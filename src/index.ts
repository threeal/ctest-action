import * as core from "@actions/core";
import { mkdirRecursive } from "./mkdir.js";

try {
  const path = core.getInput("path", { required: true });
  mkdirRecursive(path);
} catch (err) {
  core.setFailed(err);
}
