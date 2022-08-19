const octokit = new Octokit({
  auth: 'personal-access-token123'
})

await octokit.request('GET /repos/{owner}/{repo}/releases', {
  owner: 'OWNER',
  repo: 'REPO'
})
