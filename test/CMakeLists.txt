cmake_minimum_required(VERSION 3.0)
project(test)

enable_testing()
add_executable(main main.cpp)
add_test(NAME main COMMAND $<TARGET_FILE:main>)
