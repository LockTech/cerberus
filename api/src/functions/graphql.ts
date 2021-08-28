import {
  createGraphQLHandler,
  makeMergedSchema,
  makeServices,
} from '@redwoodjs/graphql-server'

import schemas from 'src/graphql/**/*.{js,ts}'

import { getCurrentUser } from 'src/lib/auth'
import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'

import services from 'src/services/**/*.{js,ts}'

export const handler = createGraphQLHandler({
  getCurrentUser,
  loggerConfig: {
    logger,
    options: {
      data: true,
      operationName: true,
      requestId: true,
      query: true,
      tracing: true,
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
