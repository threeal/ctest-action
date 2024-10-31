# CTest Action

Test [CMake](https://cmake.org/) projects using [CTest](https://cmake.org/cmake/help/book/mastering-cmake/chapter/Testing%20With%20CMake%20and%20CTest.html) on [GitHub Actions](https://github.com/features/actions).

This action wraps the [`ctest`](https://cmake.org/cmake/help/latest/manual/ctest.1.html) command for testing CMake projects.
It provides a better syntax for specifying test options compared to calling the `ctest` command directly.

By default, this action invokes `ctest` with the `--output-on-failure` and `--no-tests=error` options set. These options are configured to display the output only in case of failure and to prevent this action from testing a project that lacks any tests.

## Available Inputs

| Name           | Type              | Description                                                                               |
| -------------- | ----------------- | ----------------------------------------------------------------------------------------- |
| `test-dir`     | Path              | Specifies the directory in which to look for tests. It defaults to the `build` directory. |
| `build-config` | String            | Chooses the configuration to test.                                                        |
| `tests-regex`  | Regex pattern     | Runs tests matching the regular expression.                                               |
| `verbose`      | `true` or `false` | Enable verbose output from tests.                                                         |
| `args`         | Multiple strings  | Additional arguments to pass during the CTest run.                                        |

## Example Usages

This example demonstrates how to use this action to test a CMake project in a GitHub Actions workflow:

```yaml
name: Test
on:
  push:
jobs:
  test-project:
    name: Test Project
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4.2.2

      - name: Configure and Build Project
        uses: threeal/cmake-action@v1.3.0
        with:
          run-build: true

      - name: Test Project
        uses: threeal/ctest-action@v1.1.0
```

### Testing in a Different Directory

By default, this action runs tests in the `build` directory. To run tests in a different directory, set the `test-dir` input:

```yaml
- name: Test Project
  uses: threeal/ctest-action@v1.1.0
  with:
    test-dir: sample/build
```

### Testing a Specific Build Configuration

Some projects may require a build configuration to be specified to run tests. To specify the build configuration, set the `build-config` input:

```yaml
- name: Test Project
  uses: threeal/ctest-action@v1.1.0
  with:
    build-config: Debug
```

### Testing Specific Tests

A regular expression pattern can be provided by specifying the `tests-regex` input to run only specific tests that match the given pattern:

```yaml
- name: Test Project
  uses: threeal/ctest-action@v1.1.0
  with:
    tests-regex: ^test sample
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023-2024 [Alfi Maulana](https://github.com/threeal/)
