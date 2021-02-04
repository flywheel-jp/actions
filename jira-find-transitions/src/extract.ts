import { Transitions } from "common/jira"

const REGEXP = /Moves? (?:(?<id1>[a-zA-Z0-9]{2,}-[0-9]+)|(?:\[(?<id2>[a-zA-Z0-9]{2,}-[0-9]+)\](?:\(.+\))?)) to (?<dst>[^,\.\r\n]+)/gi

/** Extract transition declarations from the given string. */
export const extract = (str: string): Transitions => {
  let match = REGEXP.exec(str)
  if (match == null) return {}
  const transitions = {} as Transitions
  do {
    const groups = match.groups
    if (groups) {
      transitions[groups.id1 || groups.id2] = groups.dst
    }
  } while ((match = REGEXP.exec(str)) !== null)
  return transitions
}
