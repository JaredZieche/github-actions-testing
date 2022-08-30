import { Octokit } from "octokit";

const octokit = new Octokit({
  auth: ``
});

try {
  const prs = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner: 'jaredzieche',
    repo: 'github-actions-testing',
    state: 'open'
  })

  const open_prs = await octokit.paginate(prs)

  for (pr in open_prs) {
    console.log(pr.title)
  }

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
