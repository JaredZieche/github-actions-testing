echo '## Step script output 1' >> $GITHUB_STEP_SUMMARY
echo '# Step script output 2' >> $GITHUB_STEP_SUMMARY
echo 'Step script output 3' >> $GITHUB_STEP_SUMMARY
echo "::group::Release Version"
echo $RELEASE_VERSION is the newest release
echo "::endgroup::"
