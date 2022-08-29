#!/bin/bash
TOOL=$1
RELEASE_VERSION=$2
FILE="terragrunt.hcl"
cd test
sed -Ez 's/(^\s*name = '"$TOOL"'\n\s*enabled\s*=\s*"true"\n\s*revision\s*=\s*)("[0-9.a-z]")/\1'"$RELEASE_VERSION"'/g' $FILE
echo $TOOL
echo $RELEASE_VERSION
