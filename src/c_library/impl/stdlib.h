#pragma once
#include <stddef.h>

void* malloc(size_t size);
void free(void* ptr);
void* realloc(void* ptr, size_t size);
void* calloc(size_t nobj, size_t size);
