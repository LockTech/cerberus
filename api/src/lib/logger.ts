import type { redactOptions } from 'pino'
import { createLogger } from '@redwoodjs/graphql-server/logger'

const redact: redactOptions = {
  censor: '[GDPR Compliancy]',
  paths: [
    'data.redwood.currentUser.id',
    'data.redwood.currentUser.email',
    'data.redwood.currentUser.hashedPassword',
    'data.redwood.currentUser.salt',
  ],
}

export const logger = createLogger({
  options: {
    redact,
  },
})
