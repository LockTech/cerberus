import { ValidationError } from 'apollo-server-errors'

import { AccountRemoveAuthFields } from 'src/constants/account'

import { db } from 'src/lib/db'

import type { CurrentUser } from 'types/auth'
import type { IDInput } from 'types/inputs'

/**
 * Read an `Account` from the database using the requesting user's `id`, as decryptedfrom their given session.
 *
 * If an Account exists and has been `verified`, will return it and its `Organization` and `Roles`.
 *
 * @param session
 * @returns The `Account` belonging to the given `id`, with its `Organization` and `Roles` included.
 */
export const getCurrentUser = async (session: IDInput) => {
  let res = await db.account.findFirst({
    include: { organization: true, roles: true },
    where: { id: session.id, verified: true, verifiedAt: { not: null } },
  })

  if (res === null) throw new ValidationError('auth-undefined')

  res = AccountRemoveAuthFields(res) as CurrentUser

  return res
}
