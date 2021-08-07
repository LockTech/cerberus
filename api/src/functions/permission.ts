import type { APIGatewayEvent, Context } from 'aws-lambda'

import { logger } from 'src/lib/logger'

import { createPermission } from 'src/services/permissions'
import { validateBodyJSON } from 'src/validators/function/function'

import {
  validatePermissionTuple,
  ValidatePermissionTupleArgs,
} from 'src/validators/permission'

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
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.trace('Invoking permission function.')

  validateBodyJSON('permission-function', event)

  const payload = JSON.parse(event.body) as ValidatePermissionTupleArgs
  validatePermissionTuple('permission-function', payload)

  const res = await createPermission(payload)

  logger.info({ res }, 'Successfully invoked permission function.')

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(res),
  }
}
