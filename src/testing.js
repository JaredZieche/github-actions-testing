import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: ``
});

try {

  const matching_refs = await octokit.request('GET /repos/{owner}/{repo}/git/matching-refs/{ref}', {
    owner: 'jaredzieche',
    repo: 'github-actions-testing',
    ref: 'heads/notabranch'
  })

  console.log(matching_refs)
}

catch (error) {
  console.log(`${error.status}: ${error.response}`)
}

finally {
  return matching_refs.data.length
}


