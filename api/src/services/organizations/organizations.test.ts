import type { Organization } from '@prisma/client'

import { organization } from './organizations'

import type { OrganizationStandard } from './organizations.scenarios'

describe('organization service', () => {
  describe('read', () => {
    scenario(
      "reads an organization using the request's current user",
      async (scenario: OrganizationStandard) => {
        const one = scenario.organization.one as Organization
        const organizationId = one.id

        mockCurrentUser({ organizationId })

        const res = await organization()

        expect(res).toEqual(expect.objectContaining<Organization>(one))
      }
    )
  })
})
