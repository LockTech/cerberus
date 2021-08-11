import CrossFetch from 'cross-fetch'

import { isDefined } from 'src/util/asserters'

enum FetchMethods {
  GET = 'GET',
  // HEAD = 'HEAD',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  // CONNECT = 'CONNECT',
  // OPTIONS = 'OPTIONS',
  // TRACE = 'TRACE',
  // PATCH = 'PATCH',
}

export type Response<T> = {
  ok: boolean
  res: T
  status: number
  statusText: string
}

type UnknownHeaders = Record<string, unknown>
type UnknownBody = unknown

class fetch {
  /**
   * @param url
   * @param method
   * @param body The body of the request, given as a JS object or array.
   * @returns The `Response` given by the resource, typed according to the provided `generic`.
   * @throws
   *  * 'fetch-error' - If `response.status` is out of the success range (200).
   */
  static async fetch<T = Record<string, unknown>>(
    url: string,
    method: FetchMethods,
    body: UnknownBody,
    headers?: UnknownHeaders
  ) {
    const netRes = await CrossFetch(url, {
      method,
      body: isDefined(body) ? JSON.stringify(body) : null,
      headers: {
        Accepts: 'application/json',
        Connection: 'keep-alive',
        'Content-Type': 'application/json',
        ...headers,
      },
    })

    const { bodyUsed, json, ok, status, statusText } = netRes

    const res = (bodyUsed && (await json())) || {}

    return { ok, res, status, statusText } as Response<T>
  }

  static GET = async <T>(url: string, headers?: UnknownHeaders) =>
    await this.fetch<T>(url, FetchMethods.GET, undefined, headers)

  static POST = async <T>(
    url: string,
    body: UnknownBody,
    headers?: UnknownHeaders
  ) => await this.fetch<T>(url, FetchMethods.POST, body, headers)

  static PUT = async <T>(
    url: string,
    body: UnknownBody,
    headers?: UnknownHeaders
  ) => await this.fetch<T>(url, FetchMethods.PUT, body, headers)

  static DELETE = async <T>(url: string, headers?: UnknownHeaders) =>
    await this.fetch<T>(url, FetchMethods.DELETE, undefined, headers)
}

export { fetch, FetchMethods }
