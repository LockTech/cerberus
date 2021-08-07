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
  // ==
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
   */
  static async fetch<T = Record<string, string>>(
    url: string,
    method: FetchMethods,
    body: UnknownBody,
    headers?: UnknownHeaders
  ) {
    // Setup logger
    //
    const fetchLogger = logger.child({ url, method, body, headers })

    fetchLogger.trace('Attempting to perform Network Operation.')

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

    if (netRes.status < 200 || netRes.status >= 300) {
      const { bodyUsed, json, status, statusText } = netRes

      const res = (bodyUsed && (await json())) || {}

      fetchLogger.error(
        { res, status, statusText },
        'Error performing Network Operation; did not recieve "status" 200.'
      )
      throw new ValidationError('Error performing network operation.')
    }

    // Response
    //
    const res = netRes.bodyUsed && (await netRes.json())

    fetchLogger.info(
      { res },
      'Successfully transformed JSON from Network Operation.'
    )

    return res as T
  }
  //

  // ==
  /**
   * Wrapper around this classes `fetch` method, providing support for GET requests.
   *
   * @param url
   * @param body
   * @returns The `Response`, typed according to the provided `generic`.
   */
  static async GET<T>(url: string, headers?: UnknownHeaders) {
    return await this.fetch<T>(url, FetchMethods.GET, undefined, headers)
  }
  //

  // ==
  /**
   * Wrapper around this classes `fetch` method, providing support for POST requests.
   *
   * @param url
   * @param body
   * @returns The `Response`, typed according to the provided `generic`.
   */
  static async POST<T>(
    url: string,
    body: UnknownBody,
    headers?: UnknownHeaders
  ) {
    return await this.fetch<T>(url, FetchMethods.POST, body, headers)
  }
  //

  // ==
  /**
   * Wrapper around this classes `fetch` method, providing support for PUT requests.
   *
   * @param url
   * @param body
   * @returns The `Response`, typed according to the provided `generic`.
   */
  static async PUT<T>(
    url: string,
    body: UnknownBody,
    headers?: UnknownHeaders
  ) {
    return await this.fetch<T>(url, FetchMethods.PUT, body, headers)
  }
  //

  // ==
  /**
   * Wrapper around this classes `fetch` method, providing support for DELETE requests.
   *
   * @param url
   * @param body
   * @returns The `Response`, typed according to the provided `generic`.
   */
  static async DELETE<T>(url: string, headers?: UnknownHeaders) {
    return await this.fetch<T>(url, FetchMethods.DELETE, undefined, headers)
  }
  //
}

export { fetch, FetchMethods }
