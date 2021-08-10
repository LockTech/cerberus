import { ValidationError } from '@redwoodjs/api'
import CrossFetch from 'cross-fetch'

import { logger } from 'src/lib/logger'

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

type UnknownHeaders = Record<string, unknown>
type UnknownBody = unknown

class fetch {
  /**
   * A wrapper around `cross-fetch` which provides a simplified and more declarative interface for making requests.
   *
   * The request will be sent with the header `Content-Type` set to `'application/json'`.
   *
   * For the response, `Accepts` will be set to `'application/json'`.
   *
   * The method will automatically apply JSON transformations to the `body` of the request and response.
   *
   * A `generic` can be provided to offer better TypeScript support.
   *
   * @param url The resource to issue the request against
   * @param method The HTTP method defining the action to be performed
   * @param body An `unknown` object to be used as the body of the request.
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
    // Setup logger
    //
    const fetchLogger = logger.child({ url, method, body, headers })

    fetchLogger.trace('Network operation invoked.')

    // Perform network operation
    //
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
    const status = netRes.status

    if (status < 200 || status >= 300) {
      const { bodyUsed, json, statusText } = netRes

      const res = (bodyUsed && (await json())) || {}

      fetchLogger.error({ res, status, statusText }, 'Network operation error.')
      throw new ValidationError('fetch-error')
    }

    // Response
    //
    const res = netRes.bodyUsed && (await netRes.json())

    fetchLogger.info({ res, status }, 'Network operation successful')

    return res as T
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
