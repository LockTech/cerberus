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

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.trace('Invoking permission function.')

  const handler = new CRUDHandler(options)

  const res = await handler.invoke(event, context)

  return res
}
