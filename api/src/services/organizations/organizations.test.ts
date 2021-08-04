import type { Account, Organization } from '@prisma/client'
import { db } from 'src/lib/db'

import { createOrganization, organization } from './organizations'

import type { OrganizationStandard } from './organizations.scenarios'

describe('organization service', () => {
  describe('create', () => {
    scenario(
      'throws when an organization with the same name already exists',
      async (scenario: OrganizationStandard) => {
        const one = scenario.organization.one as Organization
        let name = one.name

        expect(createOrganization({ name })).rejects.toThrow({
          name: 'SyntaxError',
          message: 'name-taken',
        })

        name = one.name.toLowerCase()
        expect(createOrganization({ name })).rejects.toThrow({
          name: 'Error',
          message: 'name-taken',
        })

        name = one.name.toUpperCase()
        expect(createOrganization({ name })).rejects.toThrow({
          name: 'Error',
          message: 'name-taken',
        })
      }
    )

    scenario(
      'throws when the creating account already has an organization',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.two as Account
        const id = account.id
        mockCurrentUser({ id })

        const name = 'dragons'
        expect(createOrganization({ name })).rejects.toThrow({
          name: 'Error',
          message: 'already-member',
        })
      }
    )

    scenario(
      'throws when "name" is not a valid string',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.two as Account
        const id = account.id
        mockCurrentUser({ id })

        const name = 55
        // @ts-expect-error checking failing functionality
        expect(createOrganization({ name })).rejects.toThrow({
          name: 'Error',
          message: 'name-required',
        })
      }
    )

    scenario(
      'throws when "name" is an empty string',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.two as Account
        const id = account.id
        mockCurrentUser({ id })

        const name = ''
        expect(createOrganization({ name })).rejects.toThrow({
          name: 'Error',
          message: 'name-required',
        })
      }
    )

    scenario(
      'creates a new unique organization',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const id = account.id
        const organizationId = account.organizationId
        mockCurrentUser({ id, organizationId })

        const name = 'dragons'
        const res = await createOrganization({ name })

        expect(res.name).toBe(name)
        expect(res.id).toBeDefined()
        expect(res.createdAt).toBeDefined()
      }
    )

    scenario(
      'assigns the created organizations ID to the account creating it',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.one as Account
        const id = account.id
        const organizationId = account.organizationId
        mockCurrentUser({ id, organizationId })

        const name = 'dragons'
        const orgRes = await createOrganization({ name })

        const res = await db.account.findFirst({ where: { id } })

        expect(res.id).toBe(id)
        expect(res.organizationId).toBe(orgRes.id)
        expect(res.organizationId).not.toBeNull()
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
