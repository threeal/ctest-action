# CTest Action

[![License](https://img.shields.io/github/license/threeal/ctest-action)](./LICENSE)
[![Test Status](https://img.shields.io/github/actions/workflow/status/threeal/ctest-action/test.yml?label=test&branch=main)](https://github.com/threeal/ctest-action/actions/workflows/test.yml)

Test your [CMake](https://cmake.org/) project with [CTest](https://cmake.org/cmake/help/book/mastering-cmake/chapter/Testing%20With%20CMake%20and%20CTest.html) using [GitHub Actions](https://github.com/features/actions). This action simplifies the workflow for testing a CMake project.

## Features

- Tests a CMake project with the [`ctest`](https://cmake.org/cmake/help/latest/manual/ctest.1.html) command.

## Usage

For more information, refer to the [GitHub Actions guide](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions).

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
        uses: actions/checkout@v3.5.3

      - name: Configure and build the project
        uses: threeal/cmake-action@v1.2.0
        with:
          run-build: true

      - name: Test the project
        uses: threeal/ctest-action@main
```

## License

This project is licensed under the terms of the [MIT License](./LICENSE).

Copyright © 2023 [Alfi Maulana](https://github.com/threeal/)
