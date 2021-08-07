import type { APIGatewayEvent, Context } from 'aws-lambda'
import type { Permission } from '@prisma/client'

import { logger } from 'src/lib/logger'

import { createPermission } from 'src/services/permissions'
import { validateJSON, validateMethod } from 'src/validators/function/function'

import { validatePermissionTuple } from 'src/validators/permission'

// ==
const headers = {
  'Content-Type': 'application/json',
}

const handleError = (err: Error) => ({
  statusCode: 500,
  headers,
  body: JSON.stringify(err),
})
//

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
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.trace('Invoking permission function.')

  // Validate incoming request
  try {
    validateMethod('permission-function', event)
    validateJSON('permission-function', event)
  } catch (err) {
    return handleError(err)
  }

  // Authenticate incoming request?
  //

  //
  const payload = JSON.parse(event.body)
  const httpMethod = event.httpMethod

  let res: Permission

  // Handle incoming request
  try {
    switch (httpMethod) {
      case 'POST': {
        logger.debug({ payload }, 'Creating permission.')

        validatePermissionTuple('permission-function', payload)

        res = await createPermission(payload)
      }
    }
  } catch (err) {
    return handleError(err)
  }

  //
  logger.info({ res }, 'Successfully invoked permission function.')

  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(res),
  }
}
//
