import type { Account, Organization } from '@prisma/client'

import { AccountRemoveAuthFields } from 'src/constants/account'

import { db } from 'src/lib/db'

import type { IDInput } from 'types/inputs'

export const getCurrentUser = async (session: IDInput) => {
  let res = await db.account.findFirst({
    include: { organization: true },
    where: { id: session.id, verified: true, verifiedAt: { not: null } },
  })

  res = AccountRemoveAuthFields(res) as Account & { organization: Organization }

  return res
}
