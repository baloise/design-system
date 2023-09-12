#!/bin/bash

mkdir -p generated

rm -rf generated/www
cp -R ../packages/components/www generated

rm -rf generated/dist
cp -R ../packages/components/dist generated

echo "export * from './dist/types';" > generated/index.d.ts

echo "Copied test app files"
