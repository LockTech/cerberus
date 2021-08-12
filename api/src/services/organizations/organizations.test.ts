import type { Account, Organization } from '@prisma/client'

import { db } from 'src/lib/db'

import {
  createOrganization,
  organization as getOrganization,
} from './organizations'
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

  describe('read', () => {
    describe('organization', () => {
      scenario(
        "retrieves the currentUser's organization",
        async (scenario: OrganizationStandard) => {
          const account = scenario.account.two as Account
          const accountId = account.id
          mockCurrentUser({ id: accountId })

          const org = scenario.organization.one as Organization

          const res = await getOrganization()

          expect(res).toEqual(expect.objectContaining(org))
        }
      )
    })
  })
})
