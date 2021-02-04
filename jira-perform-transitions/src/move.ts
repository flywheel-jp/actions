import { Config, sendRequest, Transitions } from "common/jira"

const perform = async (
  issueId: string,
  dstId: string,
  config: Config
): Promise<void> => {
  const body = { transition: { id: dstId } }
  await sendRequest(`/rest/api/3/issue/${issueId}/transitions`, config, {
    method: "POST",
    body,
  })

  const resp = await sendRequest(`/rest/api/2/issue/${issueId}`, config)
  if (resp.status === 200) {
    const issue = JSON.parse(await resp.text())
    const status = issue.fields?.status?.name
    if (status) {
      console.log(`Moved ${issueId} status to ${status}`)
      return
    }
  }
  // If the issue has already been in the status
  console.log(`Failed to move ${issueId}`)
}

export const move = async (
  transitions: Transitions,
  config: Config
): Promise<void> => {
  await Promise.all(
    Object.entries(transitions).map(([issueId, dstId]) =>
      perform(issueId, dstId, config)
    )
  )
}
