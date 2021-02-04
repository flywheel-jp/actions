import { Config, sendRequest, Transitions } from "common/jira"

/** Check if the issue id exists and there is the specified destination. */
const fetchTransitionId = async (
  id: string,
  dstName: string,
  config: Config
): Promise<string | undefined> => {
  const resp = await sendRequest(`/rest/api/2/issue/${id}/transitions`, config)

  // If the id does not exist, 404 not found is returned.
  if (resp.status !== 200) return

  const body = JSON.parse(await resp.text())
  const transitions: { id: string; name: string }[] = body.transitions
  const transition = transitions.find(
    t => t.name.toLowerCase() === dstName.toLowerCase()
  )
  return transition?.id
}

/** Remove unknown issue ids from the given transitions */
export const filter = async (
  transitions: Transitions,
  config: Config,
  resolveTransitionId: (
    id: string,
    dstName: string,
    config: Config
  ) => Promise<string | undefined> = fetchTransitionId
): Promise<Transitions> => {
  const extractedIds = Object.keys(transitions)
  const destinationIds = await Promise.all(
    extractedIds.map(id => resolveTransitionId(id, transitions[id], config))
  )

  return extractedIds.reduce<Transitions>((acc, id, i) => {
    const dstId = destinationIds[i]
    return dstId ? { ...acc, [id]: dstId } : acc
  }, {})
}
