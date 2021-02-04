import { URL } from "url"
import fetch, { Headers, Response } from "node-fetch"

export interface Config {
  baseUrl: string
  userEmail: string
  apiToken: string
}

export type Transitions = Record<string, string>

interface Options {
  method: "GET" | "POST"
  body: Record<string, unknown> | undefined
}

const getCredentials = (config: Config): string =>
  Buffer.from(`${config.userEmail}:${config.apiToken}`).toString("base64")

export const sendRequest = async (
  path: string,
  config: Config,
  options: Options = { method: "GET", body: undefined }
): Promise<Response> => {
  const url = new URL(path, config.baseUrl)
  const headers = new Headers()
  headers.set("Content-Type", "application/json")
  headers.set("Authorization", `Basic ${getCredentials(config)}`)
  const body = options.body ? JSON.stringify(options.body) : undefined
  return await fetch(url, {
    method: options.method,
    headers,
    body,
  })
}
