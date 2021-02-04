import * as core from "@actions/core"
import { Transitions } from "common/jira"

import { move } from "./move"

async function run(): Promise<void> {
  try {
    const config = {
      baseUrl: core.getInput("jira_base_url"),
      userEmail: core.getInput("jira_user_email"),
      apiToken: core.getInput("jira_api_token"),
    }
    const transitions = JSON.parse(core.getInput("transitions")) as Transitions
    console.debug(`Given transitions: ${JSON.stringify(transitions)}`)
    await move(transitions, config)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
