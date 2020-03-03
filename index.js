const core = require("@actions/core")

try {
  console.log('Getting configuration for project', process.env)
  console.log(process.env)
} catch (err) {
  core.setFailed(err.message)
}
