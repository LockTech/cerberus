import type { APIGatewayEvent, Context, ProxyResult } from 'aws-lambda'
import type { Resolver, RuleValidator } from '@redwoodjs/api'

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
 * Provides minimal mapping between service-endpoints (`resolvers`) and common CRUD methods; designed to be used with a serverless function,
 * removing the need to manually call services in response to a particular method being invoked.
 *
 * `validators` used by a service's `beforeResolver` can be reused.
 *
 * To not use a resolver, pass the value `undefined`.
 *
 * @example
 *  const options: CRUDHandlerOptions = {
 *    resolvers: {
 *      DELETE: deletePermission,
 *      GET: permissions,
 *      POST: createPermission,
 *      PUT: updatePermission,
 *    },
 *    validators: {
 *      DELETE: [...],
 *      GET: [...],
 *      POST: [validatePermissionTuple],
 *      PUT: [...],
 *    },
 *  }
 *
 *  export const handler = async (event: APIGatewayEvent, context: Context) => {
 *    logger.trace('Invoking permission function.')
 *
 *    const handler = new CRUDHandler(options)
 *
 *    const res = await handler.invoke(event, context)
 *
 *    return res
 *  }
 */
export class CRUDHandler {
  constructor(private options: CRUDHandlerOptions) {
    this.options.webhooks = {
      ...WebhookDefaults,
      ...options.webhooks,
    }
  }

  async invoke(event: APIGatewayEvent, _c: Context): Promise<ProxyResult> {
    validateJSONBody('CRUDHandler', event)
    validateHTTPMethod('CRUDHandler', event)

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
      validators !== [] &&
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
