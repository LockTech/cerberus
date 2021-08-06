import { db } from 'src/lib/db'

import { removeAuthFields } from 'src/services/accounts'

export const getCurrentUser = async (session) => {
  let res = await db.account.findUnique({ where: { id: session.id } })

  res = removeAuthFields(res)

  return res
}
