import type { APIGatewayEvent, Context } from 'aws-lambda'

import { CRUDHandler } from 'src/lib/crud-handler'
import type { CRUDHandlerOptions } from 'src/lib/crud-handler'
import { logger } from 'src/lib/logger'

import { createPermission, permissions } from 'src/services/permissions'

import { validatePermissionTuple } from 'src/validators/permission'

const options: CRUDHandlerOptions = {
  resolvers: {
    DELETE: permissions,
    GET: permissions,
    POST: createPermission,
    PUT: permissions,
  },
  validators: {
    DELETE: [],
    GET: [],
    POST: [validatePermissionTuple],
    PUT: [],
  },
}
// ==
/**
 * The `body` of the request should be a valid [PermissionTuple](https://github.com/LockTech/cerberus/wiki/Glossary).
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation, function, and execution environment.
 * @throws
 *  * 'permission-tuple-invalid' - If fields are missing or invalid on `event.body`
 */
export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.trace('Invoking permission function.')

  const handler = new CRUDHandler(options)

  const res = await handler.invoke(event, context)

  return res
}
//
