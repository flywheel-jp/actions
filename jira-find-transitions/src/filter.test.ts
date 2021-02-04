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
    const check = async (id: string, dst: string): Promise<boolean> =>
      id.startsWith("KNOWN") && dst == "exist"
    await expect(filter(transitions, config, check)).resolves.toEqual({
      "KNOWN-123": "exist",
    })
  })
})
