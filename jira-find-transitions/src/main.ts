import * as core from "@actions/core"
import { filter } from "./filter"
import { extract } from "./extract"

async function run(): Promise<void> {
  try {
    const config = {
      baseUrl: core.getInput("jira_base_url"),
      userEmail: core.getInput("jira_user_email"),
      apiToken: core.getInput("jira_api_token"),
    }
    const transitions = extract(core.getInput("string"))
    console.debug(`Extracted transitions: ${JSON.stringify(transitions)}`)
    core.setOutput("transitions", await filter(transitions, config))
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
