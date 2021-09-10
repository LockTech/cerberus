import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/api'

import schemas from 'src/graphql/**/*.{js,ts}'
import services from 'src/services/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

export const handler = createGraphQLHandler({
  // @ts-expect-error api types?
  getCurrentUser,
  loggerConfig: {
    logger,
    options: {
      data: true,
      operationName: true,
      requestId: true,
      query: true,
      tracing: false,
      userAgent: true,
    },
  },
  schema: makeMergedSchema({
    schemas,
    services: makeServices({ services }),
  }),
  depthLimitOptions: {
    maxDepth: 3,
  },
  onException: () => {
    // Disconnect from your database with an unhandled exception.
    db.$disconnect()
  },
})
