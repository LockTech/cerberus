import type { Account_Confirmation } from '@prisma/client'

import { db } from 'src/lib/db'
import { logger } from 'src/lib/logger'
import { isStr } from 'src/util/asserters'

const databaseError = (service: string, err: Error) => {
  logger.error({ err }, `[${service}]: Database error occured.`)
  return 'database'
}

// ==
export interface CreateAccountOptions {
  email: string
  firstName: string
  hashedPassword: string
  lastName: string
  organizationId?: string
  salt: string
}
export const createAccount = async ({
  organizationId,
  ...rest
}: CreateAccountOptions) => {
  try {
    await db.account.create({
      data: {
        organizationId,
        ...rest,
      },
    })
  } catch (err) {
    return databaseError('createAccount', err)
  }

  return true
}
//

// ==
export interface ConfirmAccountOptions
  extends Omit<CreateAccountOptions, 'organizationId'> {
  code: string
}
export const confirmAccount = async ({
  code,
  email: enteredEmail,
  ...rest
}: ConfirmAccountOptions) => {
  let codeCheckRes: Pick<Account_Confirmation, 'email' | 'organizationId'>

  const now = new Date()
  const tenMinAgo = new Date(now.valueOf() - 60000 * 10)

  try {
    codeCheckRes = await db.account_Confirmation.findFirst({
      orderBy: { created_at: 'desc' },
      select: { email: true, organizationId: true },
      where: {
        code,
        email: enteredEmail,
        created_at: {
          gte: tenMinAgo.toISOString(),
          lt: now.toISOString(),
        },
      },
    })
  } catch (err) {
    return databaseError('confirmAccount', err)
  }

  if (codeCheckRes === undefined || codeCheckRes === null) {
    logger.error('Error validating an account requires verification.')
    return 'exist'
  }

  const email = codeCheckRes.email
  const organizationId = codeCheckRes.organizationId || null

  const createRes = await createAccount({ email, organizationId, ...rest })

  if (isStr(createRes)) return createRes

  try {
    await db.account_Confirmation.deleteMany({
      where: { email },
    })
  } catch (err) {
    logger.error({ err }, 'Error clearing Account_Confirmation.')
  }

  if (organizationId === null) return true
  else return false
}
//
