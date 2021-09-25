import { validate as isUUID } from 'uuid'
import { AuthenticationError as AuthError } from '@redwoodjs/graphql-server'

import { AccountRemoveAuthFields } from 'src/constants/account'

import { db } from 'src/lib/db'

import type { CurrentUser } from 'types/auth'
import type { IDInput } from 'types/inputs'

/**
 * Read an `Account` from the database using the requesting user's `id`, as decryptedfrom their given session.
 *
 * If an Account exists, has been `verified`, and is not `disabled`, will return it and its `Organization` and `Roles`.
 *
 * @param session
 * @returns The `Account` belonging to the given `id`, with its `Organization` and `Roles` included.
 */
export const getCurrentUser = async (session: IDInput) => {
  const { id } = session

  if (!isUUID(id)) throw new AuthError('auth-id')

  let res = await db.account.findFirst({
    include: { organization: true, roles: true },
    where: {
      disabled: false,
      id: session.id,
      organizationId: { not: null },
      verified: true,
      verifiedAt: { not: null },
    },
  })

  if (res === null) throw new AuthError('auth-undefined')

  res = AccountRemoveAuthFields(res) as CurrentUser

  return res
}
