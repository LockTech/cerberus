import type { APIGatewayEvent, Context } from 'aws-lambda'

import { CRUDHandler } from 'src/helpers/crud-handler'
import type { CRUDHandlerOptions } from 'src/helpers/crud-handler'

import { logger } from 'src/lib/logger'

import {
  createPermission,
  deletePermission,
  permissions,
} from 'src/services/permissions'

import { validatePermissionTuple } from 'src/validators/permission'

const options: CRUDHandlerOptions = {
  resolvers: {
    DELETE: deletePermission,
    GET: permissions,
    POST: createPermission,
    PUT: undefined,
  },
  validators: {
    DELETE: [validatePermissionTuple],
    GET: [],
    POST: [validatePermissionTuple],
    PUT: [],
  },
}

export const handler = async (event: APIGatewayEvent, context: Context) => {
  logger.trace('Invoking permission function.')

  const handler = new CRUDHandler(options)

  return await handler.invoke(event, context)
}
