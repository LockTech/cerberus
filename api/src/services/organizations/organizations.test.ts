import type { Organization } from '@prisma/client'

import { createOrganization, organization } from './organizations'

import type { OrganizationStandard } from './organizations.scenarios'

describe('organization service', () => {
  describe('create', () => {
    scenario(
      'throws when an organization with the same name already exists',
      async (scenario: OrganizationStandard) => {
        const one = scenario.organization.one as Organization
        const name = one.name

        expect(createOrganization({ name })).rejects.toThrow({
          name: 'SyntaxError',
          message: 'name-taken',
        })
      }
    )

    scenario(
      'creates a new unique organization',
      async (_scenario: OrganizationStandard) => {
        const name = 'dragons'

        const res = await createOrganization({ name })

        expect(res.name).toBe(name)
        expect(res.id).toBeDefined()
        expect(res.createdAt).toBeDefined()
      }
    )
  })

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
