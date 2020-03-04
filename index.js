const fs = require("fs")
const core = require("@actions/core")
const admin = require('firebase-admin')
const github = require("@actions/github")

try {
  console.log('Getting configuration for project', process.env)
  const projectId = process.env.MDP_PROJECT_ID
  console.log('Project Id input', projectId)

  // Fetch the service account key JSON file contents
  const serviceAccount = JSON.parse(
    Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_KEY, "base64").toString()
  )

  // Initialize the app with a service account, granting admin privileges
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  // As an admin, the app has access to read and write all data, regardless of Security Rules
  var db = admin.firestore();

  db.collection("project-settings").doc(projectId).get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());

      const projectSettings = doc.data()

      const envVars = Object.entries(projectSettings.keys).reduce((acc, [key, value]) => {
        return acc + `${key}=${value}\n`
      }, "")

      const payload = JSON.stringify(github.context.payload, undefined, 2)
      console.log(`The event payload: ${payload}`)

      fs.writeFileSync('.env', envVars, err => {
        if (err) throw err
        console.log('Config file created')
      })
    }
  })
  .catch(err => {
    console.log('Error getting documents', err);
  });

} catch (err) {
  console.log(err)
  core.setFailed(err.message)
}
