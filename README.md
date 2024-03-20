# CTest Action

Test your [CMake](https://cmake.org/) project with [CTest](https://cmake.org/cmake/help/book/mastering-cmake/chapter/Testing%20With%20CMake%20and%20CTest.html) using [GitHub Actions](https://github.com/features/actions). This action simplifies the workflow for testing a CMake project.

## Features

- Tests a CMake project with the [`ctest`](https://cmake.org/cmake/help/latest/manual/ctest.1.html) command.

## Usage

For more information, refer to [action.yml](./action.yml) and the [GitHub Actions guide](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

### Inputs

| Name | Value Type | Description |
| --- | --- | --- |
| `build-config` | string | Choose the configuration to test. |
| `args` | Multiple strings | Additional arguments to pass during the CTest run. |

> **Note**: Multiple strings mean that the input can be specified with more than one value. Separate each value with a space or a new line.

> **Note**: All inputs are optional.

### Examples

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
