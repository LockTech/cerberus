import type { Resolver, RuleValidator } from '@redwoodjs/graphql-server'

import { FunctionDefaultHeaders as headers } from 'src/constants/function'

import { logger } from 'src/lib/logger'

import { isFunc } from 'src/util/asserters'
import { returnFunctionError, returnFunctionSuccess } from 'src/util/function'

import { validateHTTPMethod, validateJSONBody } from 'src/validators/function'

const WebhookDefaults: Record<CRUDMethod, boolean> = {
  DELETE: true,
  GET: true,
  POST: true,
  PUT: true,
}

export type CRUDMethod = 'DELETE' | 'GET' | 'POST' | 'PUT'

export interface CRUDHandlerOptions {
  resolvers: Record<CRUDMethod, Resolver>
  validators: Record<CRUDMethod, RuleValidator[]>
  webhooks?: Record<CRUDMethod, boolean>
}

/**
 * # Summary
 *
 * Provides minimal mapping between service-endpoints (`resolvers`) and common HTTP-CRUD methods; designed to be used with a serverless function,
 * removing the need to manually call services in response to a particular method being invoked.
 *
 * The following `methods` are available to map:
 *
 * * `DELETE`
 * * `GET`
 * * `POST`
 * * `PUT`
 *
 * Requests which do not provide the above `methods` will be rejected with a status-code of `404`.
 *
 * All requests must be sent with the header `content-type` set to `application/json`; the `body` of the request should be a stringified JSON object or array,
 * whatever is applicable to your use-case. The `CRUDHandler` will take care of parsing this JSON, ensuring your service-endpoint only recieves a JavaScript object - as it
 * would if it were to be used by the GraphQL handler.
 *
 * Likewise, the endpoint will stringify the response of your service-endpoint, adding it to the `body` of the function's response.
 *
 * ## Resolver
 *
 * To not use a resolver, pass the value `undefined`; this will return a status-code of `404` if the function recieves the corresponding request (see example below).
 *
 * ## Validation
 *
 * To not provide validation, provide an empty array (see example below).
 *
 * ## Webhooks
 *
 * By default, *every* invocation of your function will be validated using [RedwoodJS' webhook features](https://redwoodjs.com/docs/webhooks.html#verifying-webhooks-with-redwoodjs-made-easy).
 * You can disable webhooks on a per-resolver basis by providing a `webhooks` object to your configuration and setting any of the `methods` to `false` (see example below).
 *
 * Your configuration will be merged on-top of the default - meaning if you disable only `GET`, all other methods will still be verified.
 *
 * ## Example
 *
 * @example
 *  const options: CRUDHandlerOptions = {
 *    resolvers: {
 *      DELETE: deletePermission,
 *      GET: permissions,
 *      POST: createPermission,
 *      PUT: undefined,
 *    },
 *    validators: {
 *      DELETE: [...],
 *      GET: [...],
 *      POST: [validatePermissionTuple],
 *      PUT: [],
 *    },
 *    webhooks: {
 *      GET: false,
 *    }
 *  }
 *
 *  export const handler = async (event: APIGatewayEvent, context: Context) => {
 *    logger.trace('Invoking permission function.')
 *
 *    const handler = new CRUDHandler(options)
 *
 *    return await handler.invoke(event, context)
 *  }
 */
export class CRUDHandler {
  constructor(private options: CRUDHandlerOptions) {
    this.options.webhooks = {
      ...WebhookDefaults,
      ...options.webhooks,
    }
  }

  async invoke(event, _c): Promise<unknown> {
    // validateJSONBody
    try {
      validateJSONBody('CRUDHandler', event)
    } catch (err) {
      return returnFunctionError(err)
    }
    // validateHTTPMethod
    try {
      validateHTTPMethod('CRUDHandler', event)
    } catch (err) {
      return {
        statusCode: 404,
        body: null,
      }
    }

    const method = event.httpMethod.toUpperCase() as CRUDMethod

    const validators = this.options.validators[method]
    const resolver = this.options.resolvers[method]
    const resolverName = resolver.name

    if (!Array.isArray(validators)) {
      logger.error(
        { method, resolverName },
        'CRUDHandler recieved an invalid validator mapping; expected an empty array or an array with (asyncronous) functions.'
      )
      return returnFunctionError(new Error('Invalid validation mapping.'))
    }
    if (resolver === undefined) {
      return {
        statusCode: 404,
        headers,
        body: null,
      }
    }
    if (!isFunc(resolver)) {
      logger.error(
        { method, resolverName },
        'CRUDHandler recieved an invalid resolver mapping; expected an (asyncronous) function.'
      )
      return returnFunctionError(new Error('Invalid resolver mapping.'))
    }

    const body = event.body ? JSON.parse(event.body) : {}

    try {
      validators.length >= 1 &&
        (await this._validateMethod(resolverName, validators, body))
    } catch (err) {
      return returnFunctionError(err)
    }

    try {
      const res = await this._executeResolver(resolver, body)
      return returnFunctionSuccess(res)
    } catch (err) {
      return returnFunctionError(err)
    }
  }

  async _validateMethod(
    resolver: string,
    validator: RuleValidator[],
    data: unknown
  ) {
    await Promise.all(
      validator.map(
        async (validate) => isFunc(validate) && (await validate(resolver, data))
      )
    )
  }

  async _executeResolver(resolver: Resolver, data: unknown) {
    return await resolver(data)
  }
}
