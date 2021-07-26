import type { Organization } from '@prisma/client'

import { organization } from './organizations'

import type { OrganizationStandard } from './organizations.scenarios'

describe('organization service', () => {
  describe('read', () => {
    scenario(
      "reads an organization using the current request's current user",
      async (scenario: OrganizationStandard) => {
        const one = scenario.organization.one as Organization
        const id = one.id

        mockCurrentUser({ id })

        const res = organization()

        expect(res).toEqual(expect.objectContaining<Organization>(one))
      }
    )
  })
})
