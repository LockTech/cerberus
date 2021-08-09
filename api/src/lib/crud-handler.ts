import type { APIGatewayEvent, Context } from 'aws-lambda'
import type { Resolver, RuleValidator } from '@redwoodjs/api'

import { logger } from 'src/lib/logger'

import { isFunc } from 'src/util/asserters'

const headers = {
  'content-type': 'application/json',
}

const handleError = (err: Error) => {
  const name = err.name
  const message = err.message

  return {
    statusCode: 500,
    headers,
    body: JSON.stringify({ message, name }),
  }
}

const WebhookDefaults: Record<CRUDMethod, boolean> = {
  DELETE: true,
  GET: true,
  POST: true,
  PUT: true,
}

export type CRUDMethod = 'POST' | 'GET' | 'PUT' | 'DELETE'

export interface CRUDHandlerOptions {
  resolvers: Record<CRUDMethod, Resolver>
  validators: Record<CRUDMethod, RuleValidator[]>
  webhooks?: Record<CRUDMethod, boolean>
}

export class CRUDHandler {
  constructor(private options: CRUDHandlerOptions) {
    this.options.webhooks = {
      ...WebhookDefaults,
      ...options.webhooks,
    }
  }

  async invoke(event: APIGatewayEvent, _context: Context) {
    const method = event.httpMethod.toUpperCase() as CRUDMethod

    const resolver = this.options.resolvers[method]
    const resolverName = resolver.name
    const validators = this.options.validators[method]

    if (!Array.isArray(validators)) {
      logger.error(
        { method, resolverName },
        'CRUDHandler recieved an invalid validator mapping; expected an empty array or an array with (asyncronous) functions.'
      )
      return handleError(new Error('Invalid validation mapping.'))
    }
    if (!isFunc(resolver)) {
      logger.error(
        { method, resolverName },
        'CRUDHandler recieved an invalid resolver mapping; expected an (asyncronous) function.'
      )
      return handleError(new Error('Invalid resolver mapping.'))
    }

    const body = event.body ? JSON.parse(event.body) : {}

    try {
      validators !== [] &&
        (await this._validateMethod(resolverName, validators, body))
    } catch (err) {
      return handleError(err)
    }

    try {
      const res = await this._executeResolver(resolver, body)

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(res),
      }
    } catch (err) {
      return handleError(err)
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
