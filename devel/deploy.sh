#!/bin/bash

set -ex

TARGET=gs://figurl/figurl-report

yarn build

zip -r build/bundle.zip build

gsutil -m cp -R ./build/* $TARGET/