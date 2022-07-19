echo '## Step script output 1' >> $GITHUB_STEP_SUMMARY
echo '# Step script output 2' >> $GITHUB_STEP_SUMMARY
echo 'Step script output 3' >> $GITHUB_STEP_SUMMARY
echo "${{github.event.inputs.version}}" >> $GITHUB_STEP_SUMMARY
