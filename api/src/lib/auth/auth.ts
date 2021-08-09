import type { Account, Organization } from '@prisma/client'

import { db } from 'src/lib/db'

import { removeAuthFields } from 'src/services/accounts'

export const getCurrentUser = async (session) => {
  let res = await db.account.findUnique({
    include: { organization: true },
    where: { id: session.id },
  })

  res = removeAuthFields(res) as Account & { organization: Organization }

  return res
}
