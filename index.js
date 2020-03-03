const core = require("@actions/core")
const github = require("@actions/github")

try {
  console.log('Getting configuration for project', process.env)
  console.log('Project Id input', core.getInput('project-id'))
  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)
} catch (err) {
  core.setFailed(err.message)
}
