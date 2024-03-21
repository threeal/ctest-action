# CTest Action

Test [CMake](https://cmake.org/) projects using [CTest](https://cmake.org/cmake/help/book/mastering-cmake/chapter/Testing%20With%20CMake%20and%20CTest.html) on [GitHub Actions](https://github.com/features/actions).

This action wraps the [`ctest`](https://cmake.org/cmake/help/latest/manual/ctest.1.html) command for testing CMake projects.
It provides a better syntax for specifying test options compared to calling the `ctest` command directly.

By default, this action invokes `ctest` with the `--output-on-failure` and `--no-tests=error` options set. These options are configured to display the output only in case of failure and to prevent this action from testing a project that lacks any tests.

## Available Inputs

| Name | Value Type | Description |
| --- | --- | --- |
| `test-dir` | path | Specifies the directory in which to look for tests. It defaults to the `build` directory. |
| `build-config` | string | Choose the configuration to test. |
| `tests-regex` | Regex pattern | Run tests matching regular expression. |
| `args` | Multiple strings | Additional arguments to pass during the CTest run. |

> **Note**: Multiple strings mean that the input can be specified with more than one value. Separate each value with a space or a new line.

> **Note**: All inputs are optional.

## Example Usages

```yaml
name: Test
on:
  push:
jobs:
  test-project:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout the repository
        uses: actions/checkout@v4.1.2

      - name: Configure and build the project
        uses: threeal/cmake-action@v1.2.0
        with:
          run-build: true

      - name: Test the project
        uses: threeal/ctest-action@main
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023-2024 [Alfi Maulana](https://github.com/threeal/)
