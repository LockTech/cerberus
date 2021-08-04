import type { Account, Organization } from '@prisma/client'
import { db } from 'src/lib/db'

import {
  createOrganization,
  organization,
  updateOrganization,
} from './organizations'

import type { OrganizationStandard } from './organizations.scenarios'

const MemberError = {
  name: 'Error',
  message: 'organization-already-member',
}
const NameTakenError = {
  name: 'Error',
  message: 'organization-name-taken',
}

describe('organization service', () => {
  describe('create', () => {
    scenario(
      'throws when an organization with the same name already exists',
      async (scenario: OrganizationStandard) => {
        const one = scenario.organization.one as Organization
        let name = one.name

        expect(createOrganization({ name })).rejects.toThrow(NameTakenError)

        name = one.name.toLowerCase()
        expect(createOrganization({ name })).rejects.toThrow(NameTakenError)

        name = one.name.toUpperCase()
        expect(createOrganization({ name })).rejects.toThrow(NameTakenError)
      }
    )

    scenario(
      'throws when the creating account already has an organization',
      async (scenario: OrganizationStandard) => {
        const account = scenario.account.two as Account
        const id = account.id
        mockCurrentUser({ id })

        const name = 'dragons'
        expect(createOrganization({ name })).rejects.toThrow(MemberError)
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

  describe('update', () => {
    scenario(
      'throws when "name" is in use by another organization',
      async (scenario: OrganizationStandard) => {
        const org1 = scenario.organization.one as Organization
        const org2 = scenario.organization.two as Organization

        const acc = scenario.account.two as Account
        mockCurrentUser({ id: acc.id, organizationId: org1.id })

        let name = org2.name
        expect(updateOrganization({ name })).rejects.toThrow(NameTakenError)

        name = org2.name.toLowerCase()
        expect(updateOrganization({ name })).rejects.toThrow(NameTakenError)

        name = org2.name.toUpperCase()
        expect(updateOrganization({ name })).rejects.toThrow(NameTakenError)
      }
    )

    scenario(
      'updates the "name" of an organization',
      async (scenario: OrganizationStandard) => {
        const org = scenario.organization.one as Organization
        const id = org.id

        const acc = scenario.account.one as Account
        mockCurrentUser({ id: acc.id, organizationId: id })

        const name = 'This new name rules!'
        const res = await updateOrganization({ name })

        const dbRes = await db.organization.findUnique({ where: { id } })

        expect(res.name).toBe(name)
        expect(dbRes.name).toBe(res.name)
      }
    )

    scenario(
      'only allows for the updating of an organization\'s "name"',
      async (scenario: OrganizationStandard) => {
        const org = scenario.organization.one as Organization
        const id = org.id

        const acc = scenario.account.one as Account
        mockCurrentUser({ id: acc.id, organizationId: id })

        const name = "some new name cause it's required"
        const updateId = '1'
        // @ts-expect-error checking failing functionality
        const res = await updateOrganization({ id: updateId, name })

        const dbRes = await db.organization.findUnique({ where: { id } })

        expect(res.id).toBe(id)
        expect(dbRes.id).toBe(res.id)
      }
    )
  })
})
