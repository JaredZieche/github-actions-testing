#!/bin/bash
echo $FILES
packer_dir=$(echo "${FILES}" | jq -r 'to_entries | map(select(.value | match("src/packer"))) | map(.value) | .[]' | cut -d'/' -f 1-3 | uniq)
echo $packer_dir
echo "PACKER_DIR=$(jq -nc --arg packer_dir "${packer_dir}" '{ packer_dirs: $packer_dir | split("\n") }')" >> $GITHUB_OUTPUT
echo $GITHUB_OUPUT
echo "# Builds" >> $GITHUB_STEP_SUMMARY
echo "${packer_dir}" >> $GITHUB_STEP_SUMMARY
