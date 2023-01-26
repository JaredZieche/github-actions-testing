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
  const response = await octokit.rest.repos.compareCommitsWithBasehead({
    basehead: 'main...feature/matrix-testing',
    owner: 'jaredzieche',
    repo: 'github-actions-testing'
  });
  const commitfiles = response.data.files
  for (const file of commitfiles) {
    console.log(file.filename)
  }

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
  const dirs = []
  const newdirs = []
  for (const pr of prs) {
    // console.log(pr.number)
    const files = await octokit.request('GET /repos/{owner}/{repo}/pulls/{pull_number}/files', {
      owner: 'jaredzieche',
      repo: 'github-actions-testing',
      pull_number: pr.number
    })
    const filenames = files.data.values.name
    // const filenames = files.data.values()
    for (let elements of filenames) {
      if (elements.filename.match(/.*src\/docker\/.*/)) {
        // console.log(elements.filename)
        var dir = path.dirname(elements.filename)
        dirs.push(`${dir}/Dockerfile`)
      }
    }
  }

  // console.log(dirs)
  let globPattern = [...new Set(dirs)]
  // console.log(globPattern)
  const globber = await glob.create(globPattern.join('\n'))
  // console.log(globber)
  const globs = await globber.glob()
  // console.log(globs)
  for (const file of globs) {
    var newdir = path.dirname(file)
    newdirs.push(newdir)
  }
  // console.log(newdirs)
  const buildMatrix = {};
  const promotionMatrix = {};
  buildMatrix.include = []
  promotionMatrix.include = []
  for (const dir of newdirs) {
    // console.log(dir)
    const configFile = `${dir}/config.json`
    // console.log(configFile)
    const config = fs.readFileSync(configFile, 'utf8')
    // console.log(config)
    let obj = JSON.parse(config)
    const mapFile = fs.readFileSync('/Users/jaredzieche/github-actions-testing/src/docker/config.json', 'utf8')
    const registryMap = JSON.parse(mapFile)
    for (const target of obj.targets) {
      var ghEnv = Object.entries(registryMap)
      // console.log(ghEnv)
      for (const [key,value] of Object.entries(registryMap)) {
        for (var t of value) {
          if (t.includes(target)) {
            let gh = key
            // console.log(key)
            buildMatrix.include.push({
              name: dir,
              image: `${obj.image["name"]}:${obj.image["tag"]}`
            })
            promotionMatrix.include.push({
              name: dir,
              env: gh,
              targets: target,
              image: `${obj.image["name"]}:${obj.image["tag"]}`
            })
          }
        }
      }
    }
  }
  console.log(buildMatrix)
  console.log(images)
  // console.log(buildMatrix)
  // console.log(promotionMatrix)
  // const buildMatrixYaml = yaml.dump(buildMatrix)
  // console.log(buildMatrixYaml)

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

catch (error) {
  console.log(`${error.status}: ${error.response}`)
}
