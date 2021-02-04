import { extract } from "./extract"

describe("extract()", () => {
  it("extracts all transition declarations", () => {
    const str = `
      Move ABC-123 to Done
      Moves [DEF-1] to in progress, move [GH-4](https://example.com) to Todo
      * Move IJK-45 to hoge.
    `
    expect(extract(str)).toEqual({
      "ABC-123": "Done",
      "DEF-1": "in progress",
      "GH-4": "Todo",
      "IJK-45": "hoge",
    })
  })

  it("returns an empty object if nothing found", () => {
    expect(extract("")).toEqual({})
  })
})
