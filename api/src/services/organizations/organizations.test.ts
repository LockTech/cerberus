import type { Account } from '@prisma/client'

import { db } from 'src/lib/db'

import { createOrganization } from './organizations'
import { OrganizationStandard } from './organizations.scenarios'

describe('organizations service', () => {
  describe('create', () => {
    scenario(
      'creates a new organization',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const accountId = account.id
        mockCurrentUser({ id: accountId })

        const name = 'Lorem'
        const adminRoleName = 'wow'

        const res = await createOrganization({ name, adminRoleName })
        const id = res.id

        const dbRes = await db.organization.findUnique({ where: { id } })

        expect(dbRes.name).toBe(name)
      }
    )
  })
})
