cmake_minimum_required(VERSION 3.0)
project(test)

enable_testing()
add_executable(test test.cpp)
add_test(NAME test COMMAND $<TARGET_FILE:test>)
