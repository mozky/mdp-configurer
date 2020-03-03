const core = require("@actions/core")

try {
  console.log(process.env)
} catch (err) {
  core.setFailed(err.message)
}
