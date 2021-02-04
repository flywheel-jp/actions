import { URL } from "url"
import fetch, { Headers, Response } from "node-fetch"

import { Config, Transitions } from "./types"

const getCredentials = (config: Config): string =>
  Buffer.from(`${config.userEmail}:${config.apiToken}`).toString("base64")

const sendRequest = async (
  path: string,
  config: Config,
  method = "GET"
): Promise<Response> => {
  const url = new URL(path, config.baseUrl)
  const headers = new Headers()
  headers.set("Content-Type", "application/json")
  headers.set("Authorization", `Basic ${getCredentials(config)}`)
  return await fetch(url, { method, headers })
}

/** Check if the issue id exists and there is the specified destination. */
const fetchIssue = async (
  id: string,
  dst: string,
  config: Config
): Promise<boolean> => {
  const resp = await sendRequest(`/rest/api/2/issue/${id}/transitions`, config)

  // If the id does not exist, 404 not found is returned.
  if (resp.status !== 200) return false

  // Validate the destination.
  const body = JSON.parse(await resp.text())
  const transitions: { name: string }[] = body.transitions
  return transitions.map(t => t.name.toLowerCase()).includes(dst.toLowerCase())
}

/** Remove unknown issue ids from the given transitions */
export const filter = async (
  transitions: Transitions,
  config: Config,
  check: (
    id: string,
    dst: string,
    config: Config
  ) => Promise<boolean> = fetchIssue
): Promise<Transitions> => {
  const extractedIds = Object.keys(transitions)
  const isExist = await Promise.all(
    extractedIds.map(id => check(id, transitions[id], config))
  )

  return extractedIds
    .filter((_, i) => isExist[i])
    .reduce<Transitions>(
      (acc, id) => ({
        ...acc,
        [id]: transitions[id],
      }),
      {}
    )
}
