import { filter } from "./filter"

describe("filter()", () => {
  it("rejects unknown key ids", async () => {
    const transitions = {
      "KNOWN-123": "exist",
      "KNOWN-456": "not exist",
      "UNKNOWN-789": "exist",
    }
    const config = {
      baseUrl: "",
      userEmail: "",
      apiToken: "",
    }
    const resolve = async (
      id: string,
      dst: string
    ): Promise<string | undefined> =>
      id.startsWith("KNOWN") && dst == "exist" ? "dstId" : undefined
    await expect(filter(transitions, config, resolve)).resolves.toEqual({
      "KNOWN-123": "dstId",
    })
  })
})
