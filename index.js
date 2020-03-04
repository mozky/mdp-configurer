const fs = require("fs")
const core = require("@actions/core")
const github = require("@actions/github")

try {
  console.log('Getting configuration for project', process.env)
  console.log('Project Id input', process.env.MDP_PROJECT_ID)

  const payload = JSON.stringify(github.context.payload, undefined, 2)
  console.log(`The event payload: ${payload}`)

  fs.writeFileSync('config/.env', process.env.MDP_PROJECT_ID, err => {
    if (err) throw err
    console.log('Config file created')
  })
} catch (err) {
  console.log(err)
  core.setFailed(err.message)
}
