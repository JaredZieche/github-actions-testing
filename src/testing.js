import { Octokit } from "octokit";
import * as yaml from "js-yaml";
import * as fs from "fs";
import * as core from "@actions/core";
import * as glob from "@actions/glob";
import * as path from "path"

const { PAT } = process.env
const { CF } = process.env

const octokit = new Octokit({
  auth: `${PAT}`
});

// const yaml = new Yaml();
// const fs = new Fs();

try {
  const open_prs = await octokit.request('GET /repos/{owner}/{repo}/pulls', {
    owner: 'jaredzieche',
    repo: 'github-actions-testing',
    state: 'open'
  })

  const prs = open_prs.data

  const matching_refs = await octokit.request('GET /repos/{owner}/{repo}/git/matching-refs/{ref}', {
    owner: 'jaredzieche',
    repo: 'github-actions-testing',
    ref: 'heads/'
  })

  // const filenames = []
  // const patterns = ['**/*yaml']
  // const globber = await glob.create(patterns.join('\n'))
  // const globs = await globber.glob()
  // console.log(globs)
  for (const pr of prs) {
    console.log(pr.number)
    const files = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
      owner: 'jaredzieche',
      repo: 'github-actions-testing',
      pull_number: pr.number
    })
    const filenames = files.data.values()
    for (let elements of filenames) {
      if (elements.filename.match(/.*src\/.*/)) {
        console.log(elements.filename)
        var dirname = path.dirname(elements.filename)
        dirs.push(dirname)
      }
    }
  }

  let dirs = [...new Set(filenames)]
  console.log(dirs)
  for (const dir of dirs) {
    const config = `${dir}/config.json`
    fetch(config)
      .then((response) => response.json())
      .then((json) => console.log(json))
  }

    // console.log(files)
    // for (const file of files.data) {
    //   console.log(process.env.CF)
    //   filenames.push(file.filename)
    //   const changed_file = "argocd-bootstrap-values.yaml"
    //   const basename = file.filename.search(/test/)
    //   const dirname = file.filename.match(/.*src\/test/)[0]
    //   console.log(basename, changed_file)
    //   console.log(dirname)
    //   const config = yaml.load(fs.readFileSync(file.filename, 'utf8'))
    //   const deployEnv = yaml.dump(config.global.deployEnv)
    //   console.log(config)
    //   console.log(deployEnv)
    //   if (basename == changed_file) {
    //     console.log('matched some files')
    //   }
    // }
}

catch (error) {
  console.log(`${error.status}: ${error.response}`)
}
