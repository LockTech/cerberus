import type { redactOptions } from 'pino'
import { createLogger } from '@redwoodjs/api/logger'

import { buildRedactString } from 'src/util/logger'

/**
 * A list of fields redacted from the `Accounts` model.
 *
 * **Additional fields can be added as needed.**
 */
const AccountRedactions = [
  'id',
  'email',
  'name',
  'hashedPassword',
  'salt',
  'verifiedAt',
  'createdAt',
  'updatedAt',
  'lastLoginAt',
  'code',
]

/**
 * Generate a list of Account redactions with an optional `prefix` attached to each.
 *
 * @example
 * getAccountRedactions('a.path')
 *
 * @param prefix A string to place before each of the Account redactions.
 * @returns A list of account redactions
 */
const getAccountRedactions = (prefix?: string) =>
  AccountRedactions.map((redaction) => buildRedactString(redaction, prefix))

const redact: redactOptions = {
  censor: '[GDPR Compliancy]',
  paths: [
    // == Accounts
    ...getAccountRedactions('data.redwood.currentUser'),
    ...getAccountRedactions('data'),
    ...getAccountRedactions('data.*'),
    ...getAccountRedactions('data.accounts.*'),
    ...getAccountRedactions('query'),
    ...getAccountRedactions('query.*'),
    //
  ],
}

export const logger = createLogger({
  options: {
    redact,
  },
})

export const prismaLogger = logger.child({ prisma: true })
